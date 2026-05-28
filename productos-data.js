// Datos completos de productos
const productosData = {
  'tuberias-pvc': {
    titulo: 'Tuberías y Accesorios de PVC',
    imagenes: ['images/productos/tubospvc.jpg', 'images/productos/accesoriospvc.jpg'],
    descripcion: 'Las tuberías de goteo son el componente fundamental de este sistema. Fabricadas con materiales resistentes y flexibles, estas tuberías están perforadas con pequeños orificios a intervalos regulares. Esto permite la liberación controlada y uniforme del agua a lo largo de la línea de riego.',
    tags: ['Tuberías', 'Accesorios PVC', 'Conectores'],
    waMessage: 'Hola HidroArca, quiero consultar sobre tuberías y accesorios de PVC'
  },
  'assif': {
    titulo: 'Líneas de Goteo con Goteros Mini PC Anti-Sifón',
    subtitulo: 'Assif',
    imagenes: ['images/productos/antisifon.webp'],
    descripcion: 'Assif es un gotero compacto, integral, compensado por presión y anti-sifón específicamente diseñado para aplicaciones de riego por goteo subterráneo (SDI). La característica anti-sifón de las líneas de goteo Assif evita la succión de arena y tierra hacia el gotero, haciéndolo adecuado para riego por goteo subterráneo en topografías desafiantes y condiciones de suelo difíciles.',
    descripcionExtra: 'La línea de goteo Assif ha demostrado consistentemente ser la solución más confiable y rentable para riego subterráneo de cultivos permanentes en topografías desafiantes, calidades de agua variables y diversas condiciones de suelo.',
    especificaciones: {
      titulo: 'Datos técnicos:',
      items: [
        '<strong>Diámetros de línea de goteo:</strong> 16/17/20/22/25 mm',
        '<strong>Espesor de pared:</strong> 0.4/0.6/0.9/1.0/1.15/1.2 mm',
        '<strong>Espaciamiento de goteros:</strong> 10/20/30/40/50/70/100/otros cm',
        '<strong>Caudal del gotero:</strong> 0.85/1.0/1.2/1.6/2.1/3.4 L/hr',
        '<strong>Rango de compensación:</strong> 8-40 m'
      ]
    },
    aplicaciones: ['Campo Abierto', 'Huertos', 'Invernaderos', 'SDI'],
    waMessage: 'Hola HidroArca, quiero consultar sobre líneas de goteo Assif'
  },
  'valvulas-liberacion': {
    titulo: 'Válvulas de Liberación de Aire',
    subtitulo: 'Válvulas de Plástico de Liberación/Alivio de Vacío',
    imagenes: ['images/productos/valvuladeliberacion.webp'],
    descripcion: 'Las válvulas de liberación de aire y alivio de vacío están diseñadas para gestionar eficientemente la descarga y admisión de aire en tuberías de agua durante las fases de arranque y apagado del sistema. Expulsan el aire atrapado durante el llenado de tuberías y permiten la entrada de aire bajo vacío o presión negativa, protegiendo las tuberías y componentes conectados de posibles daños.',
    descripcionExtra: 'Fabricadas en plástico reforzado, estas válvulas combinan durabilidad con resistencia a la intemperie y la corrosión, haciéndolas ideales tanto para aplicaciones de riego agrícola como sistemas industriales.',
    especificaciones: {
      titulo: 'Aplicaciones:',
      items: [
        '<strong>Expulsión Cinética de Aire:</strong> A medida que la tubería se llena, la válvula permanece abierta, permitiendo que el exceso de aire sea descargado del sistema. Cuando el agua ocupa completamente la tubería, la válvula se cierra firmemente para crear un sello confiable y a prueba de fugas.',
        '<strong>Admisión Cinética de Aire:</strong> Si se desarrolla presión negativa o vacío dentro de la tubería, la válvula se activa para permitir la entrada de aire. Esto previene el estrés relacionado con el vacío y protege tanto las tuberías como los componentes conectados.'
      ]
    },
    tags: ['Liberación de Aire', 'Alivio de Vacío', 'Plástico Reforzado'],
    waMessage: 'Hola HidroArca, quiero consultar sobre válvulas de liberación de aire'
  },
  'goteros': {
    titulo: 'Goteros',
    imagenes: ['https://via.placeholder.com/600x400/2DCB70/ffffff?text=Goteros'],
    descripcion: 'Goteros de alta precisión para sistemas de riego por goteo. Disponibles en diferentes caudales y configuraciones para adaptarse a cada necesidad.',
    tags: ['Goteros PC', 'Goteros Cilíndricos', 'Goteros Mini PC'],
    waMessage: 'Hola HidroArca, quiero consultar sobre goteros'
  },
  'cintas-riego': {
    titulo: 'Cintas de Riego',
    imagenes: ['https://via.placeholder.com/600x400/0A5FA6/ffffff?text=Cintas+de+Riego'],
    descripcion: 'Cintas de goteo con laberinto continuo, excepcional resistencia al taponamiento y larga durabilidad. Ideales para cultivos intensivos.',
    tags: ['Cinta de Goteo', 'MetzerTape'],
    waMessage: 'Hola HidroArca, quiero consultar sobre cintas de riego'
  },
  'irrigate-ci': {
    titulo: 'IrriGate C.I.',
    subtitulo: 'Válvulas de Control Hidráulico de Hierro Fundido',
    imagenes: ['images/productos/irrigate.webp'],
    descripcion: 'Las válvulas de control IrriGate C.I. presentan un innovador diseño de "puente curvo" que ofrece un rendimiento excepcional para diversas aplicaciones de riego. Estas revolucionarias válvulas de control proporcionan alta eficiencia de flujo y baja pérdida de presión, convirtiéndolas en una opción ideal para sistemas de riego agrícola, paisajístico, de invernadero e industrial.',
    descripcionExtra: 'La serie IrriGate C.I. ofrece una combinación de alto rendimiento, durabilidad y versatilidad, convirtiéndola en una solución de confianza para sistemas modernos de riego y control de agua.',
    caracteristicas: ['Diseño Puente Curvo', 'Alta Eficiencia', 'Baja Pérdida', 'Hierro Fundido'],
    aplicaciones: ['Agricultura', 'Paisajismo', 'Invernaderos', 'Industrial'],
    waMessage: 'Hola HidroArca, quiero consultar sobre válvulas IrriGate C.I.'
  },
  'irrigate': {
    titulo: 'IrriGate',
    subtitulo: 'Válvulas de Control Hidráulico de Plástico',
    imagenes: ['images/productos/irrigar.webp'],
    descripcion: 'Las válvulas de control IrriGate® presentan un innovador diseño de "puente curvo" que ofrece un rendimiento excepcional para diversas aplicaciones de riego. Estas revolucionarias válvulas de control proporcionan alta eficiencia de flujo y baja pérdida de presión, convirtiéndolas en una opción ideal para sistemas de riego agrícola, paisajístico, de invernadero e industrial.',
    descripcionExtra: 'La serie IrriGate ofrece una combinación de alto rendimiento, durabilidad y versatilidad, convirtiéndola en una solución de confianza para sistemas modernos de riego y control de agua.',
    caracteristicas: ['Diseño Puente Curvo', 'Alta Eficiencia', 'Baja Pérdida', 'Plástico Reforzado'],
    aplicaciones: ['Agricultura', 'Paisajismo', 'Invernaderos', 'Industrial'],
    waMessage: 'Hola HidroArca, quiero consultar sobre válvulas IrriGate'
  }
};
