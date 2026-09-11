import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

console.log('🚀 Iniciando empaquetado de LISO como archivo HTML 100% autónomo (Base64)...');

// 1. Obtener lista recursiva de archivos en una carpeta
function getAllFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

// 2. Mapear tipo MIME según extensión
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.webp': return 'image/webp';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.png': return 'image/png';
    case '.svg': return 'image/svg+xml';
    case '.gif': return 'image/gif';
    case '.mp4': return 'video/mp4';
    case '.webm': return 'video/webm';
    case '.woff2': return 'font/woff2';
    case '.woff': return 'font/woff';
    default: return 'application/octet-stream';
  }
}

// 3. Crear mapa de Data URIs para todos los assets en public/
console.log('📦 Convirtiendo imágenes y recursos a formato Base64...');
const assetFiles = getAllFiles(publicDir);
const assetMap = new Map();

for (const filePath of assetFiles) {
  const relPath = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const webPath1 = `/${relPath}`;
  const webPath2 = relPath;
  const mimeType = getMimeType(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64Data}`;
  
  assetMap.set(webPath1, dataUri);
  assetMap.set(webPath2, dataUri);
  console.log(`  ✓ ${relPath} (${(fileBuffer.length / 1024).toFixed(1)} KB)`);
}

// 4. Leer dist/index.html
const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ Error: No se encontró dist/index.html. Ejecuta "npm run build" primero.');
  process.exit(1);
}
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 5. Leer y combinar todos los archivos CSS de dist/assets/
const assetsDir = path.join(distDir, 'assets');
const assetDirFiles = fs.readdirSync(assetsDir);
const cssFiles = assetDirFiles.filter(f => f.endsWith('.css'));
const jsFiles = assetDirFiles.filter(f => f.endsWith('.js'));

let combinedCss = '';
for (const cssFile of cssFiles) {
  const cssPath = path.join(assetsDir, cssFile);
  combinedCss += fs.readFileSync(cssPath, 'utf8') + '\n';
}

// 6. Leer y combinar todos los archivos JS de dist/assets/
let combinedJs = '';
for (const jsFile of jsFiles) {
  const jsPath = path.join(assetsDir, jsFile);
  combinedJs += fs.readFileSync(jsPath, 'utf8') + '\n';
}

console.log('🔄 Reemplazando rutas de imágenes por sus cadenas Base64...');
// Ordenar claves por longitud descendente para evitar reemplazos parciales
const sortedKeys = Array.from(assetMap.keys()).sort((a, b) => b.length - a.length);

for (const key of sortedKeys) {
  const dataUri = assetMap.get(key);
  // Reemplazar en CSS
  if (combinedCss.includes(key)) {
    combinedCss = combinedCss.split(key).join(dataUri);
  }
  // Reemplazar en JS
  if (combinedJs.includes(key)) {
    combinedJs = combinedJs.split(key).join(dataUri);
  }
  // Reemplazar en HTML
  if (htmlContent.includes(key)) {
    htmlContent = htmlContent.split(key).join(dataUri);
  }
}

// 7. Reemplazar etiquetas <link rel="stylesheet"> y <script> en el HTML
// Remover enlaces externos de CSS
htmlContent = htmlContent.replace(/<link\s+rel=["']stylesheet["'][^>]*href=["'][^"']*assets\/[^"']*\.css["'][^>]*>/gi, '');
htmlContent = htmlContent.replace(/<link\s+[^>]*href=["'][^"']*assets\/[^"']*\.css["'][^>]*rel=["']stylesheet["'][^>]*>/gi, '');

// Remover scripts externos de JS
htmlContent = htmlContent.replace(/<script\s+type=["']module["'][^>]*src=["'][^"']*assets\/[^"']*\.js["'][^>]*><\/script>/gi, '');
htmlContent = htmlContent.replace(/<script\s+[^>]*src=["'][^"']*assets\/[^"']*\.js["'][^>]*><\/script>/gi, '');

// 8. Inyectar CSS en <head>
const styleTag = `<style id="liso-embedded-styles">\n${combinedCss}\n</style>`;
if (htmlContent.includes('</head>')) {
  htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
} else {
  htmlContent = styleTag + htmlContent;
}

// 9. Inyectar JS en <body> con protecciones para ejecución local (file:// y http://)
const scriptTag = `<script id="liso-embedded-bundle">\n${combinedJs}\n</script>`;
if (htmlContent.includes('</body>')) {
  htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
} else {
  htmlContent += scriptTag;
}

// 10. Guardar el archivo HTML resultante
const outputDistPath = path.join(distDir, 'liso-standalone.html');
const outputRootPath = path.join(rootDir, 'liso.html');

fs.writeFileSync(outputDistPath, htmlContent, 'utf8');
fs.writeFileSync(outputRootPath, htmlContent, 'utf8');

const stat = fs.statSync(outputRootPath);
const sizeMb = (stat.size / 1024 / 1024).toFixed(2);

console.log('\n✨ ¡Archivo HTML autónomo generado exitosamente!');
console.log(`📄 Archivo guardado en: ${outputRootPath}`);
console.log(`📁 Copia en dist: ${outputDistPath}`);
console.log(`📊 Tamaño total del archivo: ${sizeMb} MB (100% autocontenido: HTML + CSS + JS + Todas las fotos y texturas Base64)`);
console.log('💡 Puedes hacer doble clic sobre "liso.html" y abrirá directamente en cualquier navegador sin necesidad de servidores ni conexión.');
