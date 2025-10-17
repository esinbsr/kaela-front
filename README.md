# Kaela Couture – Frontend (React + Vite)

Application frontend du site vitrine de **Kaela Couture**. Elle consomme une API backend séparée (obligatoire pour le bon fonctionnement) pour l’authentification, la gestion de contenu (produits, catégories, informations, réseaux sociaux) et les commentaires.

### Principales fonctionnalités
- Navigation publique (accueil, collections, détails produit, à propos, contact, mentions légales, politique de confidentialité)
- Zone d’administration protégée (CRUD produits, catégories, informations, réseaux sociaux, modération des commentaires)
- Authentification par JWT (stocké dans `localStorage`), rôles et routes protégées (admin)
- Appels API centralisés via `axios` et intercepteurs (injection du token, gestion 401)
- Gestion des données serveur avec `react-query`
- Accessibilité et notifications (Toast)

---

## Stack technique
- React 18, Vite
- React Router DOM 6 (routing)
- Context API (auth)
- react-query (cache requêtes)
- axios (client HTTP)
- react-helmet-async (SEO/head)
- react-toastify (notifications)
- SCSS avec alias `@` vers `src` (voir `vite.config.js`)

Optionnel dans le projet: leaflet, @react-google-maps/api (cartes), tailwindcss (présent en devDependencies mais non nécessaire pour démarrer).

---

## Dépendance au backend (obligatoire)
Le frontend requiert un backend séparé (dans un autre dossier/projet). L’URL base de l’API peut être fournie via `VITE_API_URL` (recommandé) ou, à défaut, un fallback local est utilisé.

```startLine:endLine:src/api/serverRequest.jsx
// URL de base du serveur pour les requêtes API / Base server URL for API requests
// Priorité à la variable d'environnement Vite (VITE_API_URL), sinon fallback local
export const API_URL =
  import.meta?.env?.VITE_API_URL || 'http://localhost:8888/travail-perso/kaela-couture/';
```

Pour faire fonctionner l’appli:
- Démarrez le backend (assurez-vous d’avoir les routes attendues, voir la section API ci-dessous).
- Créez un fichier `.env` à la racine du frontend avec:

```env
VITE_API_URL=http://localhost:8888/travail-perso/kaela-couture/
```

Adaptez l’URL selon votre environnement (dev/prod). Redémarrez `npm run dev` après modification des variables d’environnement.

---

## Installation et démarrage

### Prérequis
- Node.js 18+ recommandé
- npm (ou yarn/pnpm)

### Étapes
```bash
# 1) Installer les dépendances
npm install

# 2) Lancer le backend séparément (obligatoire)
#    -> Configurez et démarrez votre projet backend

# 3) (Optionnel) Ajuster l'URL de l'API
#    src/api/serverRequest.jsx -> export const API_URL = '...'

# 4) Lancer le frontend en développement
npm run dev

# 5) Build de production
npm run build

# 6) Prévisualisation du build
npm run preview

# 7) Lint
npm run lint
```

Scripts disponibles (extrait de `package.json`):

```startLine:endLine:package.json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
}
```

---

## Authentification et routes protégées
L’état d’auth est géré via un `AuthProvider` (Context API). Le token JWT est décodé (user_id, role) et sauvegardé dans `localStorage`. Les routes d’administration sont protégées et exigent le rôle `admin`.

```startLine:endLine:src/components/ProtectedRoutes.jsx
// Redirige vers "/" si pas de token ou si le rôle n'est pas "admin"
if (!auth.token || auth.role !== "admin") {
  return <Navigate to="/" />;
}
```

Les intercepteurs `axios` ajoutent automatiquement l’en-tête `Authorization: Bearer <token>` et déclenchent un `logout` sur réponse 401.

---

## Navigation et pages
Extrait des routes (voir `src/App.jsx` pour la liste complète):

```startLine:endLine:src/App.jsx
// Routes publiques
<Route path="/" element={<Home />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/login" element={<Login />} />
<Route path="/contact" element={<Contact />} />
<Route path="/collection" element={<Collection />} />
<Route path="/eveningDresses" element={<EveningDresses />} />
<Route path="/latestCollection" element={<LatestCollection />} />
<Route path="/aboutMe" element={<AboutMe />} />
<Route path="/legalNotice" element={<LegalNotice />} />
<Route path="/privacyPolicy" element={<PrivacyPolicy />} />
<Route path="/productDetail/:productDetailId" element={<ProductDetail />} />

// Routes admin protégées
<Route path="/admin" element={<ProtectedRoutes><Admin /></ProtectedRoutes>} />
<Route path="/productManager" element={<ProtectedRoutes><ProductManager /></ProtectedRoutes>} />
<Route path="/updateProduct/:productId" element={<ProtectedRoutes><UpdateProduct /></ProtectedRoutes>} />
<Route path="/informationManager" element={<ProtectedRoutes><InformationManager /></ProtectedRoutes>} />
<Route path="/updateInformation/:informationId" element={<ProtectedRoutes><UpdateInformation /></ProtectedRoutes>} />
<Route path="/categoryManager" element={<ProtectedRoutes><CategoryManager /></ProtectedRoutes>} />
<Route path="/updateCategory/:categoryId" element={<ProtectedRoutes><UpdateCategory /></ProtectedRoutes>} />
<Route path="/socialNetworkManager" element={<ProtectedRoutes><SocialNetworkManager /></ProtectedRoutes>} />
<Route path="/commentsManagement" element={<ProtectedRoutes><CommentsManager /></ProtectedRoutes>} />
<Route path="/updateSocialNetwork/:socialNetworkId" element={<ProtectedRoutes><UpdateSocialNetwork /></ProtectedRoutes>} />
```

---

## API côté frontend
Tous les appels passent par `src/api/apiClient.jsx` avec `baseURL = API_URL`.

Endpoints attendus côté backend (exemples d’après les modules API):
- Auth: `POST login`, `POST signup`
- Produits: `GET getProduct`, `GET getProductById/:id`, `POST addProduct`, `POST updateProduct`, `DELETE deleteProduct/:productId`
- Catégories: `GET getProductCategory`, `GET getCategoryById/:id`, `POST addCategory`, `PUT updateCategory`, `DELETE deleteCategory/:categoryId`
- Informations: `GET getInformation`, `GET getInformationById/:id`, `POST addInformation`, `PUT updateInformation`, `DELETE ...`
- Réseaux sociaux: `GET getSocialNetwork`, `GET getSocialNetworkById/:id`, `POST addSocialNetwork`, `PUT updateSocialNetwork`, `DELETE ...`
- Sections/accueil: `GET getSection`
- Commentaires: `GET getCommentByProductId/:productId`, `POST addComment`, `POST updateComment`, `DELETE deleteComment/:commentId`
- Contact: `POST contact`

Assurez-vous que les chemins exposés par votre backend correspondent à ces routes ou adaptez-les dans les fichiers `src/api/*.jsx`.

---

## Styles et assets
- SCSS (voir `src/assets/styles`) avec import global configuré dans `vite.config.js`
- Polices custom dans `src/assets/fonts`
- Alias `@` pointe vers `src` pour des imports plus courts

---

## Structure du projet (résumé)
```
kaela-front/
├── src/
│   ├── api/                # Modules d'appels API (axios)
│   ├── assets/             # SCSS, polices, images/svg
│   ├── components/         # Composants UI (dont ProtectedRoutes, Navigation, etc.)
│   ├── context/            # AuthProvider (JWT + rôle)
│   ├── pages/              # Pages publiques et admin
│   ├── App.jsx             # Déclaration des routes
│   └── main.jsx            # Entrée, providers (QueryClient, Helmet, Auth)
├── vite.config.js          # Alias @, SCSS globals
├── package.json            # Scripts, dépendances
└── README.md
```

---

## Build & déploiement
1) Build production: `npm run build`
2) Servez le dossier `dist/` via un serveur statique (ou utilisez `npm run preview` en local)
3) En prod, ajustez `API_URL` vers l’URL publique de votre backend

---

## Dépannage
- 401 sur les routes admin: vérifiez le token et le rôle `admin`. Le token expiré déclenche un logout auto (intercepteur 401)
- Données non chargées: confirmez `API_URL` et que le backend démarre bien aux chemins attendus
- CORS: autorisez l’origine du frontend côté backend
- Styles SCSS manquants: regardez les imports globaux dans `vite.config.js` et la présence des fichiers `colors.scss`, `mixins.scss`, `font.scss`, `global.scss`

---

## Licence
Projet privé Kaela Couture. Tous droits réservés.