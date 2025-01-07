# Despliegue 

## Requerimientos funcionales

* Tener docker desktop instalado en la computadora que hará de servidor.
* Tener asignado los siguientes valores de ip en la computador servidor para que el videojuego pueda comunicarse correctamente.
   - IP Adress: 192.168.0.101
   - Subnet mask: 255.255.255.0
   - Default gateway: 192.168.0.101
   - Prefered DNS Server: 8.8.8.8
 
> [!NOTE]
> Las pruebas se realizaron haciendo uso de un router con el DHCP desactivado, para asignar ips estáticas manualmente en cada dispositivo (con un rango de 100-115).

* Contar con un dispositivo móvil con el videojuego instalado en la misma red que la computadora servidor.

> [!IMPORTANT]
> Comprobar la comunicación correctamente con la computadora servidor, a veces el firewall bloquea la comunicación con el dispositivo.

## Pasos para el despliegue

1. Clonar el repositorio a la ubicación deseada con el siguiente comando:
```
git clone https://github.com/jesusguijarro/hoyl_webapp
```

2. Abrir dos terminales, cada una en las siguientes ubicaciones del proyecto:
```
hoyl_webapp/hoyl_api
hoyl_webapp/hoyl_web
```
En ambas ejecutamos:
```
docker-compose up --build
```

Estando los dos contenedores ejecutandose, en docker desktop vamos al contenedor hoyl_api, desplegamos su contenido y entramos a "server-1", en la pestaña exec ejecutamos los siguientes comandos:

```
yarn prisma migrate deploy
yarn prisma db seed
```

Para acceder a la página web de igual manera desplegamos el contenido del contenedor hoyl_web y damos clic al puerto 3000:3000⁠ en "Port(s)" y nos llevará a nuestro navegador, o simplemente podemos acceder a http://localhost:3000/. Puede acceder con los siguientes campos:

* admin@hoyl.com
* admin

En caso, si así lo desea puede borrar ambos contenedores con el siguiente comando:
```
docker-compose down --v
```
