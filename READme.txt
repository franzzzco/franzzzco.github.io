FRANZZZ CO. — ARQUIVOS REVISADOS
Data da revisão: 11/11/2026

1. ARQUIVOS PARA PUBLICAR

  index.html
  style.css
  script.js
  assets/
    logo.svg                <- alternativa tipográfica PROVISÓRIA
    favicon.svg             <- ícone da aba PROVISÓRIO
    apple-touch-icon.png    <- ícone de atalho mobile PROVISÓRIO
    logo.png                <- original oficial, se você tiver (NÃO enviado)

Os arquivos devem manter exatamente esses nomes e caminhos. Não publique
"index(3).html", "style(3).css" e "script(3).js" com o sufixo (3),
porque o HTML referencia index.html, style.css e script.js.

2. O QUE CAUSAVA AS LOGOS QUEBRADAS

O HTML original referenciava assets/logo.png na navegação, na primeira dobra,
na seção institucional e no rodapé; o favicon também usava essa imagem.
A pasta assets/ e o arquivo logo.png NÃO estavam nos três anexos recebidos.

A revisão conserva a preferência pelo logotipo OFICIAL em assets/logo.png.
Se ele estiver na hospedagem, será usado normalmente. Se não existir, um
fallback em assets/logo.svg evita que a imagem quebrada seja exibida.

IMPORTANTE: a marca tipográfica SVG de fallback e os ícones gerados NÃO são
uma reprodução do logotipo oficial. Para ter a identidade correta, coloque o
PNG original na pasta assets/ com o nome logo.png. Para um favicon oficial,
substitua favicon.svg e apple-touch-icon.png pelas versões da marca.

3. O QUE FOI CORRIGIDO NA PRIMEIRA DOBRA

- Desktop: altura mínima da primeira dobra = altura visível da janela menos
  o cabeçalho; o conteúdo fica centralizado e não há barra horizontal.
- Mobile: layout adaptativo; em telas baixas a arte secundária é escondida
  para que chamada, explicação e botão caibam na primeira tela.
- Em dispositivos móveis mais altos, a arte continua visível.
- Em telas estreitas, o título pode quebrar naturalmente.
- Unidade svh usada com fallback vh, para reduzir variações das barras do
  Chrome/Safari no celular.
- CTA fixo de mobile não cobre mais a primeira dobra nem o formulário.

4. TESTES REALIZADOS

Simulação local em Chromium com viewports:
320x568, 360x640, 375x667, 390x844, 414x896, 430x932,
600x800, 760x900, 768x1024, 820x1180, 1024x768,
1280x720, 1366x768, 1440x900, 1920x1080, 1366x600.

Nos testes: primeira dobra acompanhou a viewport, não houve largura extra
nem erros de JavaScript. Menu mobile, seleção do serviço, criação da mensagem
WhatsApp e aparição/ocultação do CTA flutuante responderam corretamente.
Logo fallback também foi testada com o PNG ausente.

5. COMO PUBLICAR SEM QUE O CHROME EXIBA A VERSÃO ANTIGA

1) Faça backup do site atual no servidor.
2) Substitua index.html, style.css e script.js pelos arquivos deste pacote.
3) Envie a pasta assets/ inteira, mantendo sua estrutura.
4) Se possuir a logo PNG oficial, coloque-a em assets/logo.png.
5) Confirme que as permissões permitem leitura dos arquivos.
6) Limpe o cache de CDN/Cloudflare/servidor, se houver.
7) Abra em janela anônima e confira em um celular real.

O HTML agora usa style.css?v=20261111a e script.js?v=20261111a para evitar
cache antigo. Caso faça novas mudanças nesses arquivos posteriormente,
altere o identificador de versão também no index.html.

6. LIMITES DESTA REVISÃO

O domínio publicado e a estrutura do servidor não foram fornecidos; portanto
NÃO foi possível verificar configuração de hospedagem, cache real, resposta
HTTP 404 em produção, Chrome em dispositivo físico ou abertura externa
real do WhatsApp. A revisão e os testes foram feitos nos arquivos enviados.
