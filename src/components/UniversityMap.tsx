import React, { useEffect, useRef } from 'react';

// Replace this with your actual Google Maps API key.
const GOOGLE_MAPS_API_KEY = 'AIzaSyBSY8iKEH2htWIs6dSC6UQuKkUI1lYG0zg';

// List of universities offering biomedical/bioinformatics courses
const universities = [
    { name: 'JKUAT', lat: -1.0954, lng: 37.0122 },
    { name: 'Kenyatta University', lat: -1.1798, lng: 36.9344 },
    { name: 'University of Nairobi', lat: -1.2921, lng: 36.8219 },
    { name: 'Technical University of Kenya', lat: -1.2924, lng: 36.8263 },
    { name: 'Kisii University', lat: -0.6773, lng: 34.7796 },
    { name: 'University of Eldoret', lat: 0.5666, lng: 35.3066 },
    { name: 'Pwani University', lat: -3.6465, lng: 39.8468 },
    { name: 'Egerton University', lat: -0.3692, lng: 35.9323 },
    { name: 'Strathmore University', lat: -1.3090, lng: 36.8124 },
    { name: 'Maseno University', lat: -0.0035, lng: 34.5985 },
    { name: 'Moi University', lat: 0.2827, lng: 35.2912 }
];

const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];

export const UniversityMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    // Load Google Maps script dynamically.
    useEffect(() => {
        if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.includes('YOUR')) {
            console.warn('Google Maps API key is missing. Please provide a valid API key.');
            return;
        }

        const existingScript = document.getElementById('google-maps-script');
        if (!existingScript) {
            const script = document.createElement('script');
            script.id = 'google-maps-script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
        } else {
            // Script already loaded.
            if ((window as any).google && (window as any).google.maps) {
                initMap();
            } else {
                existingScript.addEventListener('load', initMap);
            }
        }
        // Cleanup listener on unmount.
        return () => {
            const script = document.getElementById('google-maps-script');
            if (script) {
                script.removeEventListener('load', initMap);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initMap = () => {
        if (!mapRef.current) return;
        const google = (window as any).google;

        // Define CustomOverlay only once map is ready
        class CustomOverlay extends google.maps.OverlayView {
            position: any;
            containerDiv: HTMLDivElement;
            content: string;

            constructor(position: any, content: string) {
                super();
                this.position = position;
                this.content = content;
                this.containerDiv = document.createElement('div');
                this.containerDiv.style.position = 'absolute';
                this.containerDiv.style.cursor = 'pointer';
                // Use Red Map Pin with Label visible
                this.containerDiv.innerHTML = `
                    <div class="group relative flex flex-col items-center hover:z-50">
                        <!-- Label (Always visible but small, or expands on hover) -->
                        <div class="mb-1 opacity-90 transition-all duration-300 transform">
                             <div class="bg-card/90 backdrop-blur text-card-foreground text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-md border border-red-500/30 whitespace-nowrap">
                                ${content}
                             </div>
                        </div>
                        
                        <!-- Red Pin Icon with Pulse -->
                        <div class="relative flex items-center justify-center w-10 h-10">
                             <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-30 duration-1500"></span>
                             <div class="relative z-10 text-red-600 filter drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3" fill="white" /></svg>
                             </div>
                        </div>
                    </div>
                `;

                // Allow clicking the marker to keep label open or do something
                this.containerDiv.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Could add logic to "zoom" to this active marker or show detailed info side panel
                });
            }

            onAdd() {
                this.getPanes().floatPane.appendChild(this.containerDiv);
            }

            onRemove() {
                if (this.containerDiv.parentElement) {
                    this.containerDiv.parentElement.removeChild(this.containerDiv);
                }
            }

            draw() {
                const projection = this.getProjection();
                const position = projection.fromLatLngToDivPixel(this.position);
                if (position) {
                    this.containerDiv.style.left = position.x + 'px';
                    this.containerDiv.style.top = position.y + 'px';
                    // Center the marker (since we are drawing at top-left of div)
                    this.containerDiv.style.transform = 'translate(-50%, -50%)';
                }
            }
        }

        const map = new google.maps.Map(mapRef.current, {
            center: { lat: -0.5, lng: 36.8 },
            zoom: 7,
            minZoom: 6,
            restriction: {
                latLngBounds: {
                    north: 5.5,
                    south: -5.0,
                    west: 33.5,
                    east: 42.0,
                },
                strictBounds: false,
            },
            styles: mapStyles,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            gestureHandling: 'cooperative'
        });

        // Add overlays
        universities.forEach((uni) => {
            const latLng = new google.maps.LatLng(uni.lat, uni.lng);
            const overlay = new CustomOverlay(latLng, uni.name);
            overlay.setMap(map);
        });
    };

    return (
        <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-border group">
            {/* Map Container */}
            <div
                ref={mapRef}
                className="w-full h-[400px] sm:h-[600px] bg-muted/20"
            />

            {/* Overlay Gradient/Texture for "Bioinformatics" feel */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

            {/* Floating Info / Instructions */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-card/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-center md:text-left">
                <h4 className="text-sm font-bold text-foreground">Explore Our Network</h4>
                <p className="text-xs text-muted-foreground">Hover over the pulsing nodes to connect with university chapters.</p>
            </div>
        </div>
    );
};
