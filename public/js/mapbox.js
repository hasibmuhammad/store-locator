mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFzaWJtdWhhbW1hZCIsImEiOiJjbGIzeTdjdmkwMml4M3hxcGRmODdtOXZtIn0.20LLTzeWXmnRnXHmeV2Ssg";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [90.3563, 23.685], // starting position [lng, lat]
  zoom: 6, // starting zoom
});

// Fetch all the stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();

  const stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1],
        ],
      },
      properties: {
        storeId: store.storeId,
        icon: "custom-marker",
      },
    };
  });
  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on("load", () => {
    map.loadImage(
      "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage("custom-marker", image);

        // Add a data source containing one point feature.
        map.addSource("point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: stores,
          },
        });

        // Add a layer to use the image to represent the data.
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "point", // reference the data source
          layout: {
            "icon-image": "custom-marker", // reference the image
            "icon-size": 0.8,
            "text-field": "{storeId}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.9],
            "text-anchor": "top",
          },
        });
      }
    );
  });
}

getStores();
