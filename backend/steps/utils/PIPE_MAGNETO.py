import xml.etree.ElementTree as ET
import json
import os

def magneto_get_jobs(palabra_clave):
    # Cargar y parsear el archivo XML
    tree = ET.parse(os.path.join(os.path.dirname(__file__), 'jobs_magneto.xml'))
    root = tree.getroot()

    # Inicializar una lista para almacenar los trabajos que coincidan con la palabra clave
    trabajos_filtrados = []

    # Recorrer cada trabajo en el XML
    for trabajo in root.findall('.//job'):
        # Obtener el título, descripción, url y ciudad del trabajo
        titulo = trabajo.find('title').text if trabajo.find('title') is not None else ""
        descripcion = trabajo.find('description').text if trabajo.find('description') is not None else ""
        redirect_url = trabajo.find('url').text if trabajo.find('url') is not None else ""
        ciudad = trabajo.find('city').text if trabajo.find('city') is not None else ""

        # Verificar si la palabra clave está en el título o en la descripción (ignorar mayúsculas/minúsculas)
        if palabra_clave.lower() in titulo.lower() or palabra_clave.lower() in descripcion.lower():
            trabajos_filtrados.append({
                'title': titulo,
                'redirect_url': redirect_url,
                'city': ciudad
            })

    return trabajos_filtrados
