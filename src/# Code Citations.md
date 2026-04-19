# Code Citations

## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```


## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```


## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```


## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```


## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```


## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```


## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```


## License: MIT
https://github.com/withastro/docs/blob/6ae095d79af9c0fb230d6c3cdfb105f649dab7b4/src/content/docs/es/guides/deploy/github.mdx

```
Push 성공했습니다! 이제 GitHub 저장소 설정과 워크플로우 수동 추가만 남았습니다.

다음 단계를 진행해주세요:

1. **GitHub 저장소 설정**:
   - https://github.com/Woonmok/news-hub-dashboard 접속
   - `Settings > Pages` 이동
   - `Build and deployment` 아래 `Source`를 `GitHub Actions`로 변경

2. **워크플로우 파일 수동 추가**:
   - 저장소 메인 페이지에서 `Add file > Create new file` 클릭
   - 경로: `.github/workflows/deploy-pages.yml`
   - 다음 내용을 복사해서 붙여넣기:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Commit 메
```

