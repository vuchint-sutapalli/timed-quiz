# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

//link with origin
echo "# saas-builder" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:vuchint-sutapalli/saas-builder.git
git push -u origin main

steps:
npm create vite@latest
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
jsconfig.json and jsconfig.app.json

{
"files": [],
"references": [
{
"path": "./jsconfig.app.json"
},
{
"path": "./jsconfig.node.json"
}
],
"compilerOptions": {
"baseUrl": ".",
"paths": {
"@/_": ["./src/_"]
}
}
}
{
"compilerOptions": {
// ...
"baseUrl": ".",
"paths": {
"@/_": [
"./src/_"
]
}
// ...
}
}

npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npm i react-router-dom

const router = createBrowserRouter([
{
element: <AppLayout />,
children: [
{
path: "/",
element: <LandingPage />,
},
],
},
]);
function App() {
return <RouterProvider router={router} />;
}
inside AppLayout use outlet
