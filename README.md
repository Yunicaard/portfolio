# Portfolio — Yunicaard

Pequeño portfolio estático creado con HTML y CSS.

Cómo usarlo localmente (Windows - cmd.exe):

1. Abrir la carpeta del proyecto:

   start .

2. Abrir `index.html` en el navegador:

   start index.html

Reemplazar la foto de perfil (opciones):

- Opción 1 (sencilla): copia tu imagen desde la carpeta de WhatsApp a la carpeta del proyecto:

```cmd
copy "%USERPROFILE%\Pictures\WhatsApp Images\WhatsApp Image 2025-10-29 at 19.12.06.jpeg" assets\photo.jpg
```

- Opción 2 (si quieres usar el SVG placeholder): ya existe `assets/photo.svg` y se usa por defecto.

Actualizar datos personales:

- Edita `index.html` para modificar el nombre, descripción corta y enlaces.
- Añade tus proyectos reales en la sección `#projects`.

Copiar tu CV al proyecto (Windows - cmd.exe):

```cmd
mkdir assets
copy "C:\Users\carde\Downloads\Curriculum_Yunai_Cárdenes (1).pdf" assets\CV.pdf
```

Después de esto, abre `index.html` y el botón **Descargar CV** ofrecerá el PDF.

Badge notes: las imágenes de las tecnologías vienen de shields.io y requieren conexión a Internet.

Rutas y archivos importantes:

- `index.html` — página principal del portfolio
- `styles.css` — estilos
- `assets/photo.svg` — placeholder visual
- `assets/photo.jpg` — reemplázalo con tu foto para que aparezca en la página
