package main

import (
	"net/http"
)

// healthcheckHandler devuelve información sobre el estado de la API
func (app *application) healthcheckHandler(w http.ResponseWriter, r *http.Request) {
	env := envelope{
		"status": "available",
		"system_info": map[string]string{
			"environment": app.config.env,
			"version":     version,
		},
	}

	err := app.writeJSON(w, http.StatusOK, env, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

// Manejador para registrar nuevos usuarios
func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	// Implementación pendiente
	app.notImplementedResponse(w, r)
}

// Manejador para crear tokens de autenticación
func (app *application) createAuthenticationTokenHandler(w http.ResponseWriter, r *http.Request) {
	// Implementación pendiente
	app.notImplementedResponse(w, r)
}

// Manejador para listar doctores
func (app *application) listDoctorsHandler(w http.ResponseWriter, r *http.Request) {
	// Implementación pendiente
	app.notImplementedResponse(w, r)
}

// Manejador para mostrar un doctor específico
func (app *application) showDoctorHandler(w http.ResponseWriter, r *http.Request) {
	// Implementación pendiente
	app.notImplementedResponse(w, r)
}

// Manejador para crear citas
func (app *application) createAppointmentHandler(w http.ResponseWriter, r *http.Request) {
	// Implementación pendiente
	app.notImplementedResponse(w, r)
}

// Manejador para mostrar el perfil del usuario
func (app *application) showUserProfileHandler(w http.ResponseWriter, r *http.Request) {
	// Implementación pendiente
	app.notImplementedResponse(w, r)
}

// Middleware para autenticación
func (app *application) authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Por ahora, simplemente pasamos al siguiente handler
		next.ServeHTTP(w, r)
	})
}