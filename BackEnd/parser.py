import requests
import sys
from database import *

# URLs útiles:
# https://launchlibrary.net/1.4/launch/next/5
# https://api.spacexdata.com/v3/launches/upcoming
# https://api.spacexdata.com/v3/launchpads


# Obtención de datos de launchlib
def get_data_launchlib(url):
    response = requests.get(url)
    datos = response.json()
    # Declaración de arrays, lo ideal sería estimar un tamaño
    name = []
    isostart = []
    vidURLs = []
    latitude = []
    longitude = []
    location_name = []
    rocket_name = []
    # missions_name = []
    # missions_description = []
    # missions_agency_name = []
    # missions_agency_abbrev = []
    # missions_agency_countryCode = []

    # print(datos['launches'][0])
    # Iteramos sobre los "launches" del json
    for launch in datos['launches']:
        # print(launch['id'])
        # Añadimos a cada array el dato correspondiente
        # Evitamos las entradas con nombre de agencia spacex (heurísitca para evitar duplicados)
        try:
            if launch['missions'][0]['agencies'][0]['name'] != "SpaceX":
                name.append(launch['name'])
                isostart.append(launch['isostart'])
                vidURLs.append(launch['vidURLs'])
                latitude.append(launch['location']['pads'][0]['latitude'])
                longitude.append(launch['location']['pads'][0]['longitude'])
                location_name.append(launch['location']['name'])
                rocket_name.append(launch['rocket']['name'])
                # missions_name.append(launch['missions'][0]['name'])
                # missions_description.append(launch['missions'][0]['description'])
                # missions_agency_name.append(launch['missions'][0]['agencies'][0]['name'])
                # missions_agency_abbrev.append(launch['missions'][0]['agencies'][0]['abbrev'])
                # missions_agency_countryCode.append(launch['missions'][0]['agencies'][0]['countryCode'])

        except:
            name.append(launch['name'])
            isostart.append(launch['isostart'])
            vidURLs.append(launch['vidURLs'])
            latitude.append(launch['location']['pads'][0]['latitude'])
            longitude.append(launch['location']['pads'][0]['longitude'])
            location_name.append(launch['location']['name'])
            rocket_name.append(launch['rocket']['name'])


    for i in range(len(isostart)):
        isostart[i] = isostart[i][:4] + "-" + isostart[i][4:]
        isostart[i] = isostart[i][:7] + "-" + isostart[i][7:]
        isostart[i] = isostart[i][:13] + ":" + isostart[i][13:]
        isostart[i] = isostart[i][:16] + ":" + isostart[i][16:]
        isostart[i] = isostart[i][:19]

    # Visualización de los datos
    for i in range(len(name)):
        print(name[i])
        print(isostart[i])
        print(vidURLs[i])
        print(latitude[i])
        print(longitude[i])
        print(location_name[i])
        print(rocket_name[i]+"\n")
        # Introducimos los datos en la DB
        try:
            url=vidURLs[i][0]
        except:
            url=None

        introducir(name[i], "2018-11-01T00:00:00", url, float(latitude[i]), float(longitude[i]), location_name[i], rocket_name[i])
        # print(missions_name[i])
        # print(missions_description[i])
        # print(missions_agency_name[i])
        # print(missions_agency_abbrev[i])
        # print(missions_agency_countryCode[i])


# Obtención de datos de spacex
def get_data_spacex(url):
    response = requests.get(url)
    datos = response.json()
    # Declaración de arrays, lo ideal sería estimar un tamaño
    mission_name = []
    launch_date_utc = []
    latitude = []
    longitude = []
    launch_site_name = []
    rocket_name = []

    # print(datos['launches'][0])
    # Como cada elemento del json no tiene nombre el bucle es algo distinto al anterior
    for launch in datos:
        # Añadimos a cada array el dato correspondiente
        mission_name.append(launch['mission_name'])
        launch_date_utc.append(launch['launch_date_utc'])
        latitude.append(launch['launch_site']['site_id'])
        longitude.append(launch['launch_site']['site_id'])
        launch_site_name.append(launch['launch_site']['site_name_long'])
        rocket_name.append(launch['rocket']['rocket_name'])

    # El json anterior no tiene información de latitud y longitud sino de la id
    # de la localización, debemos hacer un "join" con este otro json para obtener
    # la latitud y longitud
    response = requests.get('https://api.spacexdata.com/v3/launchpads')
    datos = response.json()

    site_id = []
    site_lat = []
    site_lon = []
    for launchpad in datos:
        site_id.append(launchpad['site_id'])
        site_lat.append(launchpad['location']['latitude'])
        site_lon.append(launchpad['location']['longitude'])

    # En latitude y longitude habíamos introducido la id del sitio, vamos a sustituirla
    # por la latitud y longitud reales haciendo el "join" manual antes mencionado
    for i in range(len(latitude)):
        # Averiguamos la posición (índice) que ocupa el id
        j = site_id.index(latitude[i])
        # Sustituimos los valores de latitud y longitud por los correspondientes
        latitude[i] = site_lat[j]
        longitude[i] = site_lon[j]
        # Modificamos el formato de fecha para que sea igual al de launchlib
        launch_date_utc[i] = launch_date_utc[i][:19]

    for i in range(len(mission_name)):
        print(mission_name[i])
        print(launch_date_utc[i])
        print(latitude[i])
        print(longitude[i])
        print(launch_site_name[i])
        print(rocket_name[i]+"\n")
        # Introducimos los datos en la DB
        introducir(mission_name[i], launch_date_utc[i], None, latitude[i], longitude[i], launch_site_name[i], rocket_name[i])


def main():
    # Comprobamos el número de argumentos
    if len(sys.argv) > 2:
        get_data_launchlib(sys.argv[1])
        get_data_spacex(sys.argv[2])


# Con esto se evita que la main se lance cuando este fichero se importa
if __name__ == "__main__":
    main()
