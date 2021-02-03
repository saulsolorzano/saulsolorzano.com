---
date: 2021-01-28
updated: 2021-02-03
published: true
title: Creando certificado de seguridad local
slug: /creando-certificado-seguridad-local
description: "A pesar de que un certificado de seguridad no es 100% necesario para Theme Kit y Gulp, hace que nuestro proxy funcione mejor, además, es una función bastante útil en otros contextos."
type: "post"
---

<div class="bg-gray-100 w-10/12 m-auto border series-index">
	<span class="font-bold m-0 py-1 px-5 block text-blue-700">Desarrollo de temas con Shopify</span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/recomendaciones-trabajo-con-shopify">1. Recomendaciones para trabajar con temas de Shopify</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/instalando-theme-kit">2. Instalando Theme Kit</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/creando-certificado-seguridad-local" class="current">3. Creando certificado de seguridad local</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/desarrollo-local-shopify-con-themekit-gulp">4. Usando Gulp para desarrollo local con Shopify</a></span>
</div>

A pesar de que un certificado de seguridad local no es 100% necesario y puedes saltarte este paso si lo deseas, es bastante útil igual esta función, no solo para Theme Kit sino para cualquier otra cosa que necesite un certificado de seguridad local, esta es, por mucho, la manera más cómoda de tener certificados locales.

Los pasos están tomados de <a href="https://shopify.github.io/slate/docs/create-a-self-signed-ssl-certificate" target="_blank">Slate</a>, los pasos son muy sencillos

#### 1. Instalar mkcert

Usaremos homebrew para instalar mkcert. <a href="https://github.com/FiloSottile/mkcert#installation" target="_blank">Acá</a> está la documentación completa en caso de ser necesaria.

```bash
brew install mkcert
```

#### 2. Función para generar el certificado
Idealmente esta función se agrega en tus archivos dot para tenerla siempre accesible, en caso de que no quieras hacer eso, puedes copiarla en la terminal simplemente.

```bash
function ssl-check() {
    f=~/.localhost_ssl;
    ssl_crt=$f/server.crt
    ssl_key=$f/server.key
    b=$(tput bold)
    c=$(tput sgr0)

    # local_ip=$(ip route get 8.8.4.4 | head -1 | awk '{print $7}') # Linux Version
    local_ip=$(ipconfig getifaddr $(route get default | grep interface | awk '{print $2}')) # Mac Version
    # local_ip=999.999.999 # (uncomment for testing)

    domains=(
        "localhost"
        "$local_ip"
    )

    if [[ ! -f $ssl_crt ]]; then
        echo -e "\n🛑  ${b}Couldn't find a Slate SSL certificate:${c}"
        make_key=true
    elif [[ ! $(openssl x509 -noout -text -in $ssl_crt | grep $local_ip) ]]; then
        echo -e "\n🛑  ${b}Your IP Address has changed:${c}"
        make_key=true
    else
        echo -e "\n✅  ${b}Your IP address is still the same.${c}"
    fi

    if [[ $make_key == true ]]; then
        echo -e "Generating a new Slate SSL certificate...\n"
        count=$(( ${#domains[@]} - 1))
        mkcert ${domains[@]}

        # Create Slate's default certificate directory, if it doesn't exist
        test ! -d $f && mkdir $f

        # It appears mkcert bases its filenames off the number of domains passed after the first one.
        # This script predicts that filename, so it can copy it to Slate's default location.
        if [[ $count = 0 ]]; then
            mv ./localhost.pem $ssl_crt
            mv ./localhost-key.pem $ssl_key
        else
            mv ./localhost+$count.pem $ssl_crt
            mv ./localhost+$count-key.pem $ssl_key
        fi
    fi
}
```

#### 3. Ejecutar la función
Esta función no se debe ejecutar cada vez que vayamos a trabajar. Dado que se genera por IP, solo se debe ejecutar si tu IP cambia, como por ejemplo si trabajas en varios lugares.

```bash
ssl-check
```
Esta función guarda los certificados en la ruta `~/.localhost_ssl`.

La primera vez que ejecutamos la función veremos algo parecido a esto:

```bash
🛑  Couldn\'t find a Slate SSL certificate:
Generating a new Slate SSL certificate...

Created a new local CA 💥
Note: the local CA is not installed in the system trust store.
Note: the local CA is not installed in the Firefox trust store.
Run "mkcert -install" for certificates to be trusted automatically ⚠️

Created a new certificate valid for the following names 📜
 - "localhost"
 - "192.168.100.21"

The certificate is at "./localhost+1.pem" and the key at "./localhost+1-key.pem" ✅

It will expire on 3 May 2023 🗓
```

Dado que es la primera vez que ejecuto la función en la computadora me indicará que si quiero usar el certificado en Firefox debo ejecutar `mkcert -install` también. 

Una vez ejecutada esa función, dependiendo de tu configuración local puede que veas este mensaje:

```bash
The local CA is now installed in the system trust store! ⚡️
Warning: "certutil" is not available, so the CA can't be automatically installed in Firefox! ⚠️
Install "certutil" with "brew install nss" and re-run "mkcert -install" 👈
```

Que nos indica que hace falta un paquete primero, así que seguimos los pasos:

```bash
brew install nss
mkcert -install
```

Después de todo esto veremos
```bash
→ mkcert -install
The local CA is already installed in the system trust store! 👍
The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```
Indicándonos que estamos listos.

***

Ahora solo nos falta el último paso, el más importante, la configuración de [Gulp para trabajar con Theme Kit](/desarrollo-local-shopify-con-themekit-gulp)
