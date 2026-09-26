# Marta Cabrita · Personal Organizer

Site de página única, estático (HTML + CSS + JS, sem frameworks), pronto para GitHub e Cloudflare Pages — **custo zero**.

- ~110 KB no total, 8 pedidos, fontes alojadas localmente (sem Google Fonts, sem cookies)
- SEO: título/descrição, Open Graph, dados estruturados (ProfessionalService + FAQPage), `sitemap.xml`, `robots.txt`, HTML semântico
- Acessibilidade: navegação por teclado, "saltar para o conteúdo", contrastes AA, respeita "reduzir movimento"
- Segurança e cache: ficheiro `_headers` (CSP, HSTS, cache longa para fontes e imagens)

## Estrutura

```
index.html          página principal
404.html            página de erro
_headers            cabeçalhos Cloudflare (segurança + cache)
robots.txt, sitemap.xml, site.webmanifest, favicon.svg
assets/css/styles.css
assets/js/main.js
assets/fonts/       Cormorant Garamond + Jost (woff2)
assets/img/         og-image.png (partilha), ícones
```

## 1. Antes de publicar: substituir os dados de exemplo

Procure e substitua em **index.html** (e onde indicado):

| Exemplo no site | Substituir por |
|---|---|
| `ola@martacabrita.pt` | email real (aparece 3×, incl. `data-email` do formulário) |
| `+351 900 000 000` / `+351900000000` / `351900000000` | telefone / WhatsApp real |
| `martacabrita.organizer` | Instagram real |
| `Lisboa e arredores` | zona onde trabalha (também no JSON-LD `areaServed`) |
| `https://martacabrita.pages.dev` | domínio final (index.html, robots.txt, sitemap.xml) |

**Fotografia:** coloque `marta.webp` (≈ 560×700, < 80 KB) em `assets/img/` e, na secção "Sobre", troque o bloco `photo-placeholder` pela linha `<img>` que está no comentário.

**Testemunhos:** quando tiver opiniões reais de clientes (com autorização), pode acrescentar uma secção.

## 2. Publicar no GitHub

1. Crie conta em https://github.com e clique **New repository** → nome `martacabrita-site` → **Create**.
2. Em **uploading an existing file**, arraste todo o conteúdo desta pasta (não a pasta em si) → **Commit changes**.

## 3. Publicar no Cloudflare Pages (grátis)

1. Crie conta em https://dash.cloudflare.com → **Workers & Pages** → **Create** → separador **Pages** → **Connect to Git**.
2. Escolha o repositório `martacabrita-site`.
3. Configuração de build:
   - Framework preset: **None**
   - Build command: *(vazio)*
   - Build output directory: `/`
4. **Save and Deploy**. O site fica em `https://<nome>.pages.dev`. Cada alteração no GitHub publica automaticamente.

**Domínio próprio (opcional, único custo possível ~10 €/ano):** em Pages → **Custom domains** → adicione `martacabrita.pt`. Depois atualize os URLs indicados no passo 1.

## 4. Depois de publicar

- **Google Search Console** (grátis): adicione o site e submeta `sitemap.xml`.
- **Perfil de Empresa no Google** (grátis): essencial para aparecer em pesquisas locais ("personal organizer Lisboa").
- **Cloudflare Web Analytics** (grátis, sem cookies): Pages → Metrics → ativar.

## Formulário de contacto

Não precisa de servidor: ao enviar, abre o email do visitante com a mensagem já preenchida para o seu endereço. Se no futuro quiser receber pedidos diretamente, pode usar o Formspree (plano grátis) — basta trocar o `<form>` e acrescentar `https://formspree.io` ao `form-action` e `connect-src` em `_headers`.

## Nota técnica

O `_headers` contém uma CSP com o hash do único script inline (`document.documentElement.classList.add('js')`). Se alterar essa linha, atualize o hash ou remova-o.
