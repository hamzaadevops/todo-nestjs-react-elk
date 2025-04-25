#!/bin/bash
until curl -s -X GET http://kibana:5601/api/status > /dev/null; do
    echo "Waiting for Kibana to be ready..."
    sleep 5
done

echo "Importing Kibana dashboards..."
curl -s -X POST http://kibana:5601/api/saved_objects/_import \
     -H "kbn-xsrf: true" \
     --form file=@/usr/share/kibana/imports/dashboard.ndjson
echo "Import complete!"
