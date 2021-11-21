from flask import send_file

def get_skybox(name):
    return send_file(
        "./assets/skybox/{}".format(name),
        as_attachment=True,
        attachment_filename='test.jpg',
        mimetype='image/jpeg'
    )


def get_planet_texture(planet):
    return send_file(
        "./assets/planets/{}.jpg".format(planet),
        as_attachment=True,
        attachment_filename="{}.jpg".format(planet),
        mimetype='image/jpeg'
    )


def get_satellite_texture(planet):
    return send_file(
        "./assets/satellites/{}.jpg".format(planet),
        as_attachment=True,
        attachment_filename="{}.jpg".format(planet),
        mimetype='image/jpeg'
    )


def get_heightmap(planet):
    return send_file(
        "./assets/heightmaps/{}.jpg".format(planet),
        as_attachment=True,
        attachment_filename="{}.jpg".format(planet),
        mimetype='image/jpeg'
    )
