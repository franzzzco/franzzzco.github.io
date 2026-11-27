# Atualização do site Franzzz Co. — 27/11/2026

O nome deste arquivo começa com "_", então o Jekyll não o publica. Pode subir junto ou apagar.

## Como publicar

1. No GitHub, abra o repositório `franzzzco/franzzzco.github.io`.
2. "Add file" → "Upload files" e arraste o **conteúdo** desta pasta (não a pasta em si), mantendo as subpastas.
3. Confirme que vai substituir os arquivos de mesmo nome e faça o commit.
4. Em "Actions", espere o build do Pages ficar verde (1 a 2 minutos).
5. Abra o site em janela anônima e confira: home, /cases.html, /blog/ e o artigo de Natal.

## Arquivos alterados

| Arquivo | O que mudou |
| --- | --- |
| index.html | Copy nova focada no cliente, seção "Algum desses é o seu caso?", vitrine de resultados, FAQ com preços, schema de empresa local + FAQ, og:image |
| cases.html | Títulos com segmento e resultado, âncoras por case, schema, og:image, CTA de análise gratuita, espaço comentado para depoimentos |
| style.css | Estilos das seções novas (adicionados no fim; nada antigo foi removido) |
| script.js | Mensagem do WhatsApp pede a análise gratuita; registra conversão no GA4 se ele estiver instalado |
| sitemap.xml | Passa a incluir home e cases; ignora CSS/JS |
| _config.yml | Descrição do blog com cidade; autora padrão dos posts: Nicoly Franz |
| _layouts/default.html | Título/descrição corretos por página, og:image padrão, rodapé com cidade e WhatsApp, schema do blog |
| _layouts/post.html | Schema de artigo e breadcrumb, autora visível, caixa de CTA e caixa da autora no fim de cada post |
| blog/index.html | H1 e textos com palavra-chave, CTA de análise gratuita |
| blog/blog.css | Estilos do CTA, da caixa da autora e do rodapé |
| _posts/2026-11-26-campanhas-de-natal-memoria-de-marca.md | Autora padronizada, frase sem fonte reescrita, alt da imagem, seção prática sobre anúncios, botões antigos removidos |
| assets/og-image.png | Novo: imagem que aparece quando o link é compartilhado no WhatsApp/Instagram |

## Faça você (não dá para fazer por arquivo)

- **Apagar** `_posts/2026-11-24-teste.md` e `assets/blog/capa blog 1 ajuste.png` (só o post de teste usa essa imagem).
- **Search Console:** adicionar a propriedade com prefixo de URL `https://franzzzco.github.io/`, escolher "Tag HTML", colar o código no comentário indicado no `<head>` do index.html, enviar `sitemap.xml` e pedir a indexação da home e de /cases.html.
- **Google Analytics 4:** criar a propriedade, trocar `G-XXXXXXXXXX` no `<head>` do index.html e remover as marcas de comentário. A conversão `generate_lead` já é enviada pelo script.
- **Perfil da Empresa no Google:** criar com o nome exato "Franzzz Co.", categoria "Agência de marketing", área de atendimento Ijuí – RS.
- **Domínio próprio:** quando registrar, troque `https://franzzzco.github.io/` pelo novo domínio em `_config.yml` (url), index.html e cases.html (canonical, og:url, og:image e JSON-LD).
- **Depoimentos:** em cases.html há um bloco comentado em cada case. Com autorização do cliente, preencha e remova as marcas de comentário.
