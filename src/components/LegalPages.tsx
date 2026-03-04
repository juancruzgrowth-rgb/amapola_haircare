import React from 'react';
import { motion } from 'motion/react';
import { Shield, Cookie, FileText, Scale, CreditCard, Truck, RotateCcw, Mail, ExternalLink } from 'lucide-react';

// ═══════════ Privacy Policy Page ═══════════
export const PrivacyPage = () => (
    <div className="pt-28 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6">
                    <Shield size={16} />
                    Legal
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent mb-4">
                    Política de Privacidad
                </h1>
                <p className="text-brand-text-muted text-sm italic">Última actualización: 4 de marzo de 2026</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-12">

                <LegalSection title="1. Responsable del Tratamiento">
                    <ul className="space-y-2 list-none">
                        <li><strong>Identidad:</strong> Amapola Haircare</li>
                        <li><strong>Dirección:</strong> [Dirección fiscal — completar]</li>
                        <li><strong>Email:</strong> privacidad@amapolahaircare.com</li>
                        <li><strong>NIF:</strong> [NIF — completar]</li>
                    </ul>
                </LegalSection>

                <LegalSection title="2. Datos que Recopilamos">
                    <p>Recopilamos tus datos personales cuando:</p>
                    <ul className="space-y-2 list-disc pl-6 mt-3">
                        <li><strong>Realizas una compra:</strong> nombre, email, dirección de envío, teléfono y datos de pago.</li>
                        <li><strong>Completas nuestro Quiz Capilar:</strong> nombre, email, tipo de cabello, preocupaciones capilares y preferencias.</li>
                        <li><strong>Te suscribes a nuestra newsletter:</strong> dirección de email.</li>
                        <li><strong>Nos contactas:</strong> datos que nos proporciones voluntariamente.</li>
                    </ul>
                </LegalSection>

                <LegalSection title="3. Finalidad del Tratamiento">
                    <p className="mb-4">Utilizamos tus datos para las siguientes finalidades:</p>
                    <div className="overflow-x-auto rounded-xl border border-brand-bg-alt">
                        <table className="w-full text-sm">
                            <thead className="bg-brand-bg-alt">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Finalidad</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Base Legal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-bg-alt">
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">Gestionar tu pedido y envío</td><td className="px-6 py-4">Ejecución del contrato</td></tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">Generar tu rutina capilar personalizada (PDF)</td><td className="px-6 py-4">Consentimiento explícito</td></tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">Enviarte comunicaciones comerciales</td><td className="px-6 py-4">Consentimiento explícito</td></tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">Mejorar nuestros productos y servicios</td><td className="px-6 py-4">Interés legítimo</td></tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">Cumplir con obligaciones fiscales y legales</td><td className="px-6 py-4">Obligación legal</td></tr>
                            </tbody>
                        </table>
                    </div>
                </LegalSection>

                <LegalSection title="4. Conservación de Datos">
                    <ul className="space-y-2 list-disc pl-6">
                        <li><strong>Datos de compra:</strong> se conservan durante el periodo legalmente exigido (5 años para obligaciones fiscales).</li>
                        <li><strong>Datos del Quiz:</strong> se conservan mientras mantengas tu consentimiento o hasta que solicites su eliminación.</li>
                        <li><strong>Datos de newsletter:</strong> hasta que te des de baja.</li>
                    </ul>
                </LegalSection>

                <LegalSection title="5. Tus Derechos">
                    <p className="mb-6">Conforme al Reglamento General de Protección de Datos (RGPD), tienes derecho a:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <RightCard icon="📋" title="Acceso" desc="Solicitar una copia de tus datos personales." />
                        <RightCard icon="✏️" title="Rectificación" desc="Corregir datos inexactos o incompletos." />
                        <RightCard icon="🗑️" title="Supresión" desc="Solicitar la eliminación de tus datos." />
                        <RightCard icon="⏸️" title="Limitación" desc="Restringir el tratamiento de tus datos." />
                        <RightCard icon="📤" title="Portabilidad" desc="Recibir tus datos en formato estructurado." />
                        <RightCard icon="🚫" title="Oposición" desc="Oponerte al tratamiento de tus datos." />
                    </div>
                    <LegalNote>
                        Para ejercer cualquiera de estos derechos, escríbenos a{' '}
                        <a href="mailto:privacidad@amapolahaircare.com" className="text-brand-primary hover:underline">
                            privacidad@amapolahaircare.com
                        </a>. Responderemos en un plazo máximo de 30 días.
                    </LegalNote>
                </LegalSection>

                <LegalSection title="6. Destinatarios de los Datos">
                    <p>Tus datos podrán ser comunicados a:</p>
                    <ul className="space-y-2 list-disc pl-6 mt-3">
                        <li><strong>Proveedores de pago:</strong> Stripe para procesar pagos con tarjeta de forma segura.</li>
                        <li><strong>Empresas de mensajería:</strong> para la entrega de pedidos.</li>
                        <li><strong>Plataformas de email:</strong> para enviar comunicaciones si has dado tu consentimiento.</li>
                    </ul>
                    <p className="mt-4 font-medium">No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>
                </LegalSection>

                <LegalSection title="7. Seguridad">
                    <p>
                        Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos,
                        incluyendo cifrado SSL/TLS en todas las comunicaciones y almacenamiento seguro de
                        datos sensibles. Los datos de pago son procesados directamente por Stripe y nunca
                        se almacenan en nuestros servidores.
                    </p>
                </LegalSection>

                <LegalSection title="8. Autoridad de Control">
                    <p>
                        Si consideras que tus derechos no han sido debidamente atendidos, puedes presentar
                        una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>{' '}
                        en{' '}
                        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline inline-flex items-center gap-1">
                            www.aepd.es <ExternalLink size={12} />
                        </a>.
                    </p>
                </LegalSection>

            </motion.div>
        </div>
    </div>
);

// ═══════════ Cookie Policy Page ═══════════
export const CookiesPage = () => (
    <div className="pt-28 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6">
                    <Cookie size={16} />
                    Legal
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent mb-4">
                    Política de Cookies
                </h1>
                <p className="text-brand-text-muted text-sm italic">Última actualización: 4 de marzo de 2026</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-12">

                <LegalSection title="1. ¿Qué son las Cookies?">
                    <p>
                        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
                        (ordenador, tablet o móvil) cuando visitas un sitio web. Se utilizan ampliamente
                        para que los sitios web funcionen correctamente, para registrar información sobre
                        la visita del usuario y para mejorar la experiencia de navegación.
                    </p>
                </LegalSection>

                <LegalSection title="2. Cookies que Utilizamos">
                    <h3 className="font-serif font-semibold text-brand-secondary text-lg mb-3 mt-2">Cookies Técnicas (necesarias)</h3>
                    <p className="mb-4">Son esenciales para que el sitio web funcione. No requieren consentimiento.</p>
                    <div className="overflow-x-auto rounded-xl border border-brand-bg-alt mb-8">
                        <table className="w-full text-sm">
                            <thead className="bg-brand-bg-alt">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Cookie</th>
                                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Finalidad</th>
                                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Duración</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-bg-alt">
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors">
                                    <td className="px-5 py-3"><code className="bg-brand-bg-alt px-2 py-0.5 rounded text-xs font-mono text-brand-primary-dark">amapola_cart</code></td>
                                    <td className="px-5 py-3">Almacena los productos de tu carrito de compras</td>
                                    <td className="px-5 py-3">Persistente (localStorage)</td>
                                </tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors">
                                    <td className="px-5 py-3"><code className="bg-brand-bg-alt px-2 py-0.5 rounded text-xs font-mono text-brand-primary-dark">amapola_cookies</code></td>
                                    <td className="px-5 py-3">Registra tu preferencia sobre cookies</td>
                                    <td className="px-5 py-3">1 año</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="font-serif font-semibold text-brand-secondary text-lg mb-3">Cookies Analíticas</h3>
                    <p className="mb-4">
                        Nos ayudan a entender cómo interactúas con nuestro sitio web, recopilando información
                        de forma anónima. Solo se instalan con tu consentimiento.
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-brand-bg-alt">
                        <table className="w-full text-sm">
                            <thead className="bg-brand-bg-alt">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Cookie</th>
                                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Proveedor</th>
                                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Finalidad</th>
                                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Duración</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-bg-alt">
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors">
                                    <td className="px-5 py-3"><code className="bg-brand-bg-alt px-2 py-0.5 rounded text-xs font-mono text-brand-primary-dark">_ga</code></td>
                                    <td className="px-5 py-3">Google Analytics</td>
                                    <td className="px-5 py-3">Distinguir usuarios únicos</td>
                                    <td className="px-5 py-3">2 años</td>
                                </tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors">
                                    <td className="px-5 py-3"><code className="bg-brand-bg-alt px-2 py-0.5 rounded text-xs font-mono text-brand-primary-dark">_ga_*</code></td>
                                    <td className="px-5 py-3">Google Analytics</td>
                                    <td className="px-5 py-3">Mantener estado de sesión</td>
                                    <td className="px-5 py-3">2 años</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <LegalNote>
                        <strong>Nota:</strong> Las cookies analíticas podrán activarse en el futuro.
                        Todo uso se reflejará en esta tabla y requerirá tu consentimiento previo.
                    </LegalNote>
                </LegalSection>

                <LegalSection title="3. ¿Cómo Gestionar tus Cookies?">
                    <p className="mb-4">
                        Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta
                        que desactivar algunas cookies puede afectar la funcionalidad del sitio.
                    </p>
                    <h3 className="font-serif font-semibold text-brand-secondary text-lg mb-3">Instrucciones por navegador</h3>
                    <ul className="space-y-2 list-disc pl-6">
                        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                        <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                        <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio web</li>
                        <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
                    </ul>
                </LegalSection>

                <LegalSection title="4. Cookies de Terceros">
                    <p className="mb-3">
                        Nuestro sitio puede incluir servicios de terceros que instalan sus propias cookies:
                    </p>
                    <ul className="space-y-2 list-disc pl-6">
                        <li>
                            <a href="https://stripe.com/es/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline inline-flex items-center gap-1">
                                Stripe <ExternalLink size={12} />
                            </a> — procesamiento de pagos.
                        </li>
                        <li>
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline inline-flex items-center gap-1">
                                Google Analytics <ExternalLink size={12} />
                            </a> — análisis web (si se activa).
                        </li>
                    </ul>
                </LegalSection>

                <LegalSection title="5. Consentimiento">
                    <p>
                        Al acceder a nuestro sitio web, se muestra un banner informativo sobre cookies.
                        Puedes aceptar o rechazar las cookies opcionales. Las cookies técnicas necesarias
                        para el funcionamiento del sitio se activan sin consentimiento, conforme a la normativa vigente.
                    </p>
                    <p className="mt-3">
                        Puedes modificar tu consentimiento en cualquier momento borrando las cookies de tu
                        navegador y volviendo a visitar nuestro sitio.
                    </p>
                </LegalSection>

                <LegalSection title="6. Contacto">
                    <p>
                        Si tienes dudas sobre nuestra política de cookies, contáctanos en{' '}
                        <a href="mailto:privacidad@amapolahaircare.com" className="text-brand-primary hover:underline">
                            privacidad@amapolahaircare.com
                        </a>.
                    </p>
                </LegalSection>

            </motion.div>
        </div>
    </div>
);

// ═══════════ Terms & Conditions Page ═══════════
export const TermsPage = () => (
    <div className="pt-28 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6">
                    <Scale size={16} />
                    Legal
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent mb-4">
                    Términos y Condiciones
                </h1>
                <p className="text-brand-text-muted text-sm italic">Última actualización: 4 de marzo de 2026</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-12">

                <LegalSection title="1. Identificación del Vendedor">
                    <ul className="space-y-2 list-none">
                        <li><strong>Nombre comercial:</strong> Amapola Haircare</li>
                        <li><strong>Razón social:</strong> [Razón social — completar]</li>
                        <li><strong>NIF:</strong> [NIF — completar]</li>
                        <li><strong>Dirección:</strong> [Dirección fiscal — completar]</li>
                        <li><strong>Email:</strong> hola@amapolahaircare.com</li>
                    </ul>
                </LegalSection>

                <LegalSection title="2. Productos y Precios">
                    <p>
                        Todos los productos ofrecidos en nuestra tienda online son productos cosméticos
                        para el cuidado capilar. Los precios mostrados incluyen el IVA aplicable en España.
                    </p>
                    <p className="mt-3">
                        Nos reservamos el derecho de modificar los precios en cualquier momento. Los productos
                        se facturan al precio vigente en el momento de confirmación del pedido.
                    </p>
                </LegalSection>

                <LegalSection title="3. Proceso de Compra">
                    <ol className="space-y-3 list-none counter-reset-list">
                        {[
                            { step: 'Selección', desc: 'Añade los productos deseados al carrito.' },
                            { step: 'Revisión', desc: 'Verifica tu pedido antes de continuar.' },
                            { step: 'Datos de envío', desc: 'Introduce tu dirección de entrega.' },
                            { step: 'Pago', desc: 'Selecciona tu método de pago y completa la transacción.' },
                            { step: 'Confirmación', desc: 'Recibirás un email de confirmación con el resumen.' },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-sm font-bold">{i + 1}</span>
                                <div><strong>{item.step}:</strong> {item.desc}</div>
                            </li>
                        ))}
                    </ol>
                </LegalSection>

                <LegalSection title="4. Métodos de Pago">
                    <p className="mb-4">Aceptamos los siguientes métodos de pago:</p>
                    <div className="space-y-3">
                        <PaymentMethodCard icon={<CreditCard size={24} />} title="Tarjeta de crédito / débito" desc="Visa, Mastercard, a través de Stripe (pago seguro con cifrado)." />
                        <PaymentMethodCard icon={<span className="text-2xl">📱</span>} title="Bizum" desc="Pago instantáneo desde tu app bancaria." />
                        <PaymentMethodCard icon={<span className="text-2xl">🏦</span>} title="Transferencia bancaria" desc="El pedido se procesará una vez confirmada la recepción del pago." />
                    </div>
                </LegalSection>

                <LegalSection title="5. Envíos">
                    <div className="overflow-x-auto rounded-xl border border-brand-bg-alt mb-4">
                        <table className="w-full text-sm">
                            <thead className="bg-brand-bg-alt">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Zona</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Plazo estimado</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-brand-text-light font-semibold">Coste</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-bg-alt">
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">España peninsular</td><td className="px-6 py-4">2-4 días laborables</td><td className="px-6 py-4">[Precio — completar]</td></tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">Baleares</td><td className="px-6 py-4">4-6 días laborables</td><td className="px-6 py-4">[Precio — completar]</td></tr>
                                <tr className="hover:bg-brand-bg-alt/50 transition-colors"><td className="px-6 py-4">Canarias, Ceuta y Melilla</td><td className="px-6 py-4">5-8 días laborables</td><td className="px-6 py-4">[Precio — completar]</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <LegalNote>
                        Los plazos de entrega son estimados y pueden variar según la empresa de transporte.
                        Recibirás un número de seguimiento por email una vez realizado el envío.
                    </LegalNote>
                </LegalSection>

                <LegalSection title="6. Derecho de Desistimiento">
                    <p>
                        Conforme al <strong>Real Decreto Legislativo 1/2007</strong>, tienes un plazo de{' '}
                        <strong>14 días naturales</strong> desde la recepción del producto para ejercer tu
                        derecho de desistimiento sin necesidad de justificación.
                    </p>

                    <h3 className="font-serif font-semibold text-brand-secondary text-lg mb-3 mt-6">Condiciones</h3>
                    <ul className="space-y-2 list-disc pl-6">
                        <li>El producto debe estar sin usar, con el precinto original intacto.</li>
                        <li>El embalaje original debe estar en buen estado.</li>
                        <li>Los productos cosméticos abiertos o usados no pueden devolverse por motivos de higiene.</li>
                    </ul>

                    <h3 className="font-serif font-semibold text-brand-secondary text-lg mb-3 mt-6">Procedimiento</h3>
                    <ol className="space-y-2 list-decimal pl-6">
                        <li>
                            Escríbenos a{' '}
                            <a href="mailto:hola@amapolahaircare.com" className="text-brand-primary hover:underline">
                                hola@amapolahaircare.com
                            </a>{' '}
                            indicando tu número de pedido.
                        </li>
                        <li>Te enviaremos instrucciones para la devolución del producto.</li>
                        <li>Una vez recibido y verificado, procederemos al reembolso en un plazo máximo de 14 días.</li>
                    </ol>
                    <LegalNote>
                        El coste de la devolución será a cargo del consumidor, salvo que el producto presente
                        defectos o no corresponda con el pedido realizado.
                    </LegalNote>
                </LegalSection>

                <LegalSection title="7. Garantía Legal">
                    <p>
                        Todos nuestros productos cuentan con la <strong>garantía legal de conformidad de 3 años</strong>{' '}
                        establecida por la legislación española. Si el producto presenta un defecto de fabricación
                        o no se ajusta a lo descrito, puedes solicitar la reparación, sustitución, rebaja del
                        precio o la resolución del contrato.
                    </p>
                </LegalSection>

                <LegalSection title="8. Propiedad Intelectual">
                    <p>
                        Todos los contenidos del sitio web de Amapola Haircare (textos, imágenes, logotipos,
                        diseño gráfico) son propiedad de Amapola Haircare o de sus licenciantes y están
                        protegidos por las leyes de propiedad intelectual. Queda prohibida su reproducción,
                        distribución o transformación sin autorización expresa.
                    </p>
                </LegalSection>

                <LegalSection title="9. Resolución de Conflictos">
                    <p>
                        En caso de disputa, puedes recurrir a la plataforma de resolución de litigios en línea
                        de la Unión Europea:{' '}
                        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline inline-flex items-center gap-1">
                            ec.europa.eu/consumers/odr <ExternalLink size={12} />
                        </a>
                    </p>
                    <p className="mt-3">
                        La legislación aplicable es la española. Para cualquier litigio, serán competentes
                        los juzgados y tribunales del domicilio del consumidor.
                    </p>
                </LegalSection>

                <LegalSection title="10. Contacto">
                    <p className="mb-3">
                        Para cualquier consulta sobre estas condiciones de venta:
                    </p>
                    <ul className="space-y-2 list-none">
                        <li className="flex items-center gap-3">
                            <Mail size={16} className="text-brand-primary" />
                            <a href="mailto:hola@amapolahaircare.com" className="text-brand-primary hover:underline">hola@amapolahaircare.com</a>
                        </li>
                    </ul>
                </LegalSection>

            </motion.div>
        </div>
    </div>
);

// ═══════════ Shared Sub-components ═══════════

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="relative">
            <h2 className="font-serif text-xl font-bold text-brand-text mb-4 pb-2 border-b-2 border-brand-primary-light inline-block">
                {title}
            </h2>
            <div className="text-brand-text-light leading-relaxed">
                {children}
            </div>
        </section>
    );
}

function RightCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-brand-bg-alt hover:border-brand-primary-light hover:-translate-y-0.5 hover:shadow-md transition-all">
            <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
            <div>
                <strong className="block text-brand-text text-sm">{title}</strong>
                <p className="text-xs text-brand-text-muted mt-0.5">{desc}</p>
            </div>
        </div>
    );
}

function LegalNote({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-brand-bg-alt border-l-3 border-brand-primary px-5 py-4 rounded-r-lg text-sm text-brand-text-light mt-4">
            {children}
        </div>
    );
}

function PaymentMethodCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-brand-bg-alt hover:border-brand-primary-light hover:shadow-sm transition-all">
            <div className="flex-shrink-0 text-brand-primary mt-0.5">{icon}</div>
            <div>
                <strong className="block text-brand-text">{title}</strong>
                <p className="text-sm text-brand-text-light mt-1">{desc}</p>
            </div>
        </div>
    );
}
