import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo para los doctores
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
}

const Home = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de datos - en producción se obtendría de la API
    const mockDoctors = [
      { id: 1, name: 'Dr. Juan Pérez', specialty: 'Cardiología', rating: 4.8, imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Dra. María López', specialty: 'Pediatría', rating: 4.9, imageUrl: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Dr. Carlos Rodríguez', specialty: 'Neurología', rating: 4.7, imageUrl: 'https://via.placeholder.com/150' },
    ];
    setDoctors(mockDoctors);
  }, []);

  const handleDoctorClick = (id: number) => {
    navigate(`/doctors/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Encuentra al mejor doctor</h1>
        <input
          type="text"
          placeholder="Buscar por nombre o especialidad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Doctores destacados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden">
            <img src={doctor.imageUrl} alt={doctor.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-600">Especialidad: {doctor.specialty}</p>
              <p className="text-sm text-gray-600">Calificación: {doctor.rating}/5</p>
              <button
                className="mt-3 inline-flex justify-center rounded-md bg-primary px-3 py-2 text-white text-sm font-medium hover:bg-primary-dark"
                onClick={() => handleDoctorClick(doctor.id)}
              >
                Ver perfil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;