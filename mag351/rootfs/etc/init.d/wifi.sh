#!/bin/sh


# WiFi interface name
IFACE_NAME=wlan0

case $1 in

    get_ip)
        log "Fetching IP address info for wireless interface"

        ifconfig ${IFACE_NAME} 2>/dev/null | awk '/inet addr/{ printf substr($2, 6) }'
    ;;

    stop)
        /sbin/ifdown ${IFACE_NAME}
    ;;

    start)
        /sbin/ifdown ${IFACE_NAME}
        /sbin/ifup ${IFACE_NAME}
    ;;

    restart)
        /sbin/ifdown ${IFACE_NAME}
        /sbin/ifup ${IFACE_NAME}
    ;;

    *)
        echo "Wireless init script v0.1"
        echo "usage: [start|stop|restart|get_ip]"
    ;;
esac

exit 0;

