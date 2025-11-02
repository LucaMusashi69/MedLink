package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	// Inicializar el router
	router := httprouter.New()

	// Configuración de manejo de errores
	router.NotFound = http.HandlerFunc(app.notFoundResponse)
	router.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowedResponse)

	// Rutas públicas
	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthcheckHandler)
	router.HandlerFunc(http.MethodPost, "/v1/users", app.registerUserHandler)
	router.HandlerFunc(http.MethodPost, "/v1/tokens/authentication", app.createAuthenticationTokenHandler)

	// Rutas protegidas
	protected := alice.New(app.authenticate)

	router.Handler(http.MethodGet, "/v1/doctors", protected.ThenFunc(app.listDoctorsHandler))
	router.Handler(http.MethodGet, "/v1/doctors/:id", protected.ThenFunc(app.showDoctorHandler))
	router.Handler(http.MethodPost, "/v1/appointments", protected.ThenFunc(app.createAppointmentHandler))
	router.Handler(http.MethodGet, "/v1/users/me", protected.ThenFunc(app.showUserProfileHandler))

	// Middleware para todas las rutas
	standard := alice.New(app.recoverPanic, app.logRequest, app.enableCORS)

	return standard.Then(router)
}