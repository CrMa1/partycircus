import Modal from './Modal'
import { BUSINESS } from '@/lib/config'

export default function PrivacyModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Aviso de privacidad" size="lg">
      <div className="max-w-none text-ink [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-base [&_h3]:md:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-ink-soft [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-ink-soft [&_ul]:text-[15px] [&_ul]:my-3 [&_li]:my-1">
        <p>
          <strong>{BUSINESS.name}</strong> (en adelante, “Party Circus”), con domicilio en {BUSINESS.addressFull}, es responsable del uso, tratamiento y protección de los datos personales que el usuario proporcione mediante este sitio web o por canales de comunicación como WhatsApp.
        </p>

        <h3>Datos que recabamos</h3>
        <ul>
          <li>Nombre.</li>
          <li>Teléfono.</li>
          <li>Correo electrónico, en caso de que el usuario lo proporcione.</li>
          <li>Fecha deseada del evento.</li>
          <li>Tipo de evento.</li>
          <li>Número de personas estimado.</li>
          <li>Paquete seleccionado.</li>
          <li>Información que el usuario comparta a través de WhatsApp o de los formularios de la landing.</li>
        </ul>

        <h3>Finalidades primarias</h3>
        <ul>
          <li>Responder solicitudes de información.</li>
          <li>Generar cotizaciones de eventos.</li>
          <li>Confirmar disponibilidad y condiciones de servicio.</li>
          <li>Dar seguimiento comercial a la solicitud del usuario.</li>
          <li>Coordinar la prestación del evento solicitado.</li>
        </ul>

        <h3>Finalidades secundarias</h3>
        <ul>
          <li>Envío de promociones y campañas comerciales futuras.</li>
          <li>Recordatorios y comunicación de servicios, paquetes o temporadas especiales.</li>
        </ul>

        <h3>Consentimiento</h3>
        <p>
          Al enviar tus datos mediante esta landing o WhatsApp, aceptas que Party Circus pueda usarlos para dar seguimiento a tu solicitud y enviarte información relacionada con sus servicios y promociones.
        </p>

        <h3>Derechos del titular</h3>
        <p>
          El usuario puede solicitar el acceso, rectificación, cancelación u oposición al tratamiento de sus datos personales (derechos ARCO), así como solicitar dejar de recibir promociones, contactando a Party Circus por WhatsApp al {BUSINESS.whatsappDisplay} o por correo electrónico a {BUSINESS.email}.
        </p>

        <h3>Transferencias</h3>
        <p>
          Party Circus no transferirá los datos personales a terceros sin el consentimiento del titular, salvo en los casos previstos por la legislación mexicana aplicable.
        </p>

        <h3>Cambios al aviso</h3>
        <p>
          Party Circus podrá modificar el presente aviso de privacidad en cualquier momento. Las actualizaciones estarán disponibles en este mismo sitio web.
        </p>

        <p className="text-xs text-muted/80 mt-6">
          Última actualización: {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long' })}.
        </p>
      </div>
    </Modal>
  )
}
