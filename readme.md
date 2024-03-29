# NekoFan
Nova versió del codi font del blog, que ja li toca una neteja de cara. Tot en versió de desenvolupament i sense provar res (compte si algú aprofita alguna cosa, igual no li funciona :pray:).

Per aquí aniré penjant idees, el que vaig fent, apunts, ...

## Estructura inicial de directoris
La estructura de directoris del repo es:
- **_src_**: fonts html, xml, ...
- **_imatges_**: Imatges SVG
- **_icones_**: Icones (en format SVG)
- **_js-libs_**: llibreries JS personals

## Carrega dels arxius SVG, JS i/o CSS
Poden carregar-se els arxius amb el codi javascript  a través de [jsDelivr](https://www.jsdelivr.com/).

La url base per carregar els scripts es `https://cdn.jsdelivr.net/gh/sammy-iatta/blog_NekoFan/<path_repositori>/<nom_arxiu_a_carregar>`, amb el tag html `<img/>`, `<script/>` o `<style/>` segons el tipus d'element a carregar.

En els dos casos, si es vol carregar una versió minimitzada, es pot afegir el suffix `.min` abans de la extensió (per exemple *temps_de_lectura`.min`.js*

Hi ha més informació a https://www.jsdelivr.com/?docs=gh

## Eines emprades
- Per fer les proves de les funcions i classes s'ha d'instalar un servidor web local. Com no faré servir .NET ni coses similars, [XAMPP](https://www.apachefriends.org/) es una bona opció i molt fàcil de instal·lar i configurar.
- No oblidem el [Visual Studio Code](https://code.visualstudio.com/), que ens ajudarà a picar el codi :cat:
- Minimitzar i compilar el codi javascript amb [Google](https://closure-compiler.appspot.com/home)
- Blogger (de Google). Sé que es una mica :shit:, però són ja molts anys i molta cosa escrita dintre de la plataforma.
