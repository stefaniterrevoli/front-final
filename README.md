​##​Infraestructura del Proyecto
##Frontend (front_final)
src/
├── main.jsx, App.jsx, index.css
│
├── layouts/          # Navbar, Sidebar, Footer
├── pages/            # 9 rutas
│   ├── Home          /
│   ├── LoginPage     /login
│   ├── RegisterPage  /register
│   ├── EventosPage   /eventos
│   ├── NoticiasPage  /noticias
│   ├── ObrasPage     /obras
│   ├── CreadoresPage /creadores
│   ├── ProfilePage   /perfil      (ProtectedRoute)
│   └── AdminPage     /admin       (AdminRoute)
│
├── components/
│   ├── AdminComponents/   # 5 (Chapters, Eventos, Noticias, Obras, Reports)
│   ├── CreadorComponents/ # 2 (Card, DonatePopup)
│   ├── EventoComponents/  # 2 (Card, Popup)
│   ├── ObraComponents/    # 4 (Card, Popup, ChapterList, UploadObra)
│   ├── ProfileComponents/ # 8 (Header, Image, Content, Stats, Subs, Donate, Reports, BecomeCreator)
│   └── Carousel, SearchBar, PopupInicio, ProtectedRoute, AdminRoute
│
├── context/          # 6 providers
│   ├── AuthContext       login/logout/register + token
│   ├── AdminContext      admin mock data (localStorage)
│   ├── CreadoresContext  GET /creators
│   ├── EventosContext    GET /events
│   ├── ObrasContext      GET /artworks
│   └── ProfileContext    avatar, stats, donaciones, seguidores, reportes
│
└── services/
    └── api.js         # Axios → http://localhost:3000/creativa/api/v1

Localhost:5173
Stack: React 19 + Vite 8 + Tailwind 4 + react-router-dom 7 + Leaflet + Axios
