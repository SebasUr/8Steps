import xml.etree.ElementTree as ET

def magneto_get_jobs(xml_file, palabra_clave):
    # Cargar y parsear el archivo XML
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Inicializar una lista para almacenar los trabajos que coincidan con la palabra clave
    trabajos_filtrados = []

    # Recorrer cada trabajo en el XML
    for trabajo in root.findall('.//job'):
        # Obtener el título y la descripción del trabajo
        titulo = trabajo.find('title').text if trabajo.find('title') is not None else ""
        descripcion = trabajo.find('description').text if trabajo.find('description') is not None else ""

        # Verificar si la palabra clave está en el título o en la descripción (ignorar mayúsculas/minúsculas)
        if palabra_clave.lower() in titulo.lower() or palabra_clave.lower() in descripcion.lower():
            trabajos_filtrados.append({
                'title': titulo,
#                'description': descripcion,
                'url': trabajo.find('url').text if trabajo.find('url') is not None else ""
            })

    return trabajos_filtrados

# Ejemplo de uso
xml_file = 'jobs_magneto.xml'  # El nombre del archivo XML que quieres analizar
palabra_clave = 'Ingeniero de Sistemas'  # La palabra clave para filtrar los trabajos

trabajos = magneto_get_jobs(xml_file, palabra_clave)

# Mostrar los resultados
for trabajo in trabajos:
    print(f"Título: {trabajo['title']}")
    #print(f"Descripción: {trabajo['description']}")
    print(f"URL: {trabajo['url']}")
    print("-" * 40)
