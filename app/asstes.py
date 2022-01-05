from flask import send_file, abort

def get_skybox(name):
    try:
        return send_file(
            "./assets/skybox/{}".format(name),
            as_attachment=True,
            attachment_filename='test.jpg',
            mimetype='image/jpeg'
        )
    except FileNotFoundError:
        abort(404, 'Skybox image {0} not found.'.format(name))


def get_planet_texture(planet):
    try:
        return send_file(
            "./assets/planets/{}.jpg".format(planet),
            as_attachment=True,
            attachment_filename="{}.jpg".format(planet),
            mimetype='image/jpeg'
        )
    except FileNotFoundError:
        abort(404, 'Texture for planet {0} not found.'.format(planet))


def get_satellite_texture(planet):
    try:
        return send_file(
            "./assets/satellites/{}.jpg".format(planet),
            as_attachment=True,
            attachment_filename="{}.jpg".format(planet),
            mimetype='image/jpeg'
        )
    except FileNotFoundError:
        abort(404, 'Texture for satellite {0} not found.'.format(planet))


def get_heightmap(planet):
    try:
        return send_file(
            "./assets/heightmaps/{}.jpg".format(planet),
            as_attachment=True,
            attachment_filename="{}.jpg".format(planet),
            mimetype='image/jpeg'
        )
    except FileNotFoundError:
        abort(404, 'Heightmap for {0} not found.'.format(planet))
