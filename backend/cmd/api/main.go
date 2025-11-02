package main

import (
    "context"
    "flag"
    "fmt"
    "log"
    "net/http"
    "os"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// Versión de la aplicación
const version = "1.0.0"

// Configuración de la aplicación
type config struct {
    port int
    env  string
    db   struct {
        dsn  string // MongoDB URI
        name string // Database name
    }
    jwt struct {
        secret string
    }
}

// Dependencias de la aplicación
type application struct {
    config config
    logger *log.Logger
    mongo  *mongo.Database
}

func main() {
	// Configuración por defecto
    var cfg config
    flag.IntVar(&cfg.port, "port", 4000, "API server port")
    flag.StringVar(&cfg.env, "env", "development", "Environment (development|staging|production)")
    flag.StringVar(&cfg.db.dsn, "db-dsn", "mongodb://localhost:27017", "MongoDB URI")
    flag.StringVar(&cfg.db.name, "db-name", "doctor_app", "MongoDB database name")
    flag.StringVar(&cfg.jwt.secret, "jwt-secret", "your-secret-key", "JWT secret key")
    flag.Parse()

	// Configuración del logger
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

    // Conexión a MongoDB
    client, err := openMongo(cfg)
    if err != nil {
        logger.Fatal(err)
    }
    defer func() {
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()
        _ = client.Disconnect(ctx)
    }()
    logger.Printf("MongoDB connection established to %s/%s", cfg.db.dsn, cfg.db.name)

    // Instancia de la aplicación
    app := &application{
        config: cfg,
        logger: logger,
        mongo:  client.Database(cfg.db.name),
    }

	// Servidor HTTP
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	// Iniciar el servidor
	logger.Printf("starting %s server on %s", cfg.env, srv.Addr)
	err = srv.ListenAndServe()
	logger.Fatal(err)
}

// Función para abrir la conexión a MongoDB
func openMongo(cfg config) (*mongo.Client, error) {
    clientOpts := options.Client().ApplyURI(cfg.db.dsn)

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOpts)
    if err != nil {
        return nil, err
    }

    // Ping para verificar la conexión
    if err := client.Ping(ctx, nil); err != nil {
        return nil, err
    }

    return client, nil
}