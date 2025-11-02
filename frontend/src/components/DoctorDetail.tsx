import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Tipo para los detalles del doctor
interface DoctorDetails {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  description: string;
  education: string[];
  experience: string;
  address: string;
  phone: string;
}

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<DoctorDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de datos - en producción se obtendría de la API
    const mockDoctor: DoctorDetails = {
      id: Number(id),
      name: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      rating: 4.8,
      imageUrl: 'https://via.placeholder.com/300',
      description: 'Especialista en cardiología con más de 10 años de experiencia en el diagnóstico y tratamiento de enfermedades cardiovasculares.',
      education: [
        'Universidad Nacional de Medicina - Doctor en Medicina',
        'Hospital Central - Residencia en Medicina Interna',
        'Instituto Cardiovascular - Especialidad en Cardiología'
      ],
      experience: '10 años de experiencia en cardiología clínica',
      address: 'Av. Principal 123, Consultorio 405',
      phone: '+1 234 567 890'
    };
    
    setDoctor(mockDoctor);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-8">Cargando...</div>;
  }

  if (!doctor) {
    return <div className="max-w-3xl mx-auto px-4 py-8">Doctor no encontrado</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover md:col-span-1" />
          <div className="p-6 md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
            <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 mt-2 mb-3">
              {doctor.specialty}
            </span>
            <p className="text-gray-700 mb-2">{doctor.description}</p>
            <p className="text-sm text-gray-600">Calificación: {doctor.rating}/5</p>
            <button className="mt-4 inline-flex justify-center rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-primary-dark">
              Agendar Cita
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Educación</h2>
          <div className="space-y-2">
            {doctor.education.map((edu, index) => (
              <p key={index} className="text-sm text-gray-700">• {edu}</p>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Información de Contacto</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Dirección:</strong> {doctor.address}</p>
            <p><strong>Teléfono:</strong> {doctor.phone}</p>
            <p><strong>Experiencia:</strong> {doctor.experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;