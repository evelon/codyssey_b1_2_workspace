# 영화 리뷰 캘린더

OMDb(IMDb) API로 영화 정보를 검색해서, 본 날짜에 리뷰를 기록하고 캘린더로 모아보는 SPA입니다.

## 배포 URL

- 서비스: https://codyssey-b1-2-workspace.vercel.app/
- 저장소: https://github.com/evelon/codyssey_e1_2_workspace

## 기술 스택

- **프레임워크**: React 19 + TypeScript (strict 모드)
- **빌드 도구**: Vite
- **라우팅**: react-router
- **백엔드**: Supabase (PostgreSQL + REST API)
- **외부 API**: OMDb API (영화 검색/메타데이터)
- **날짜 처리**: date-fns
- **스타일링**: CSS Modules
- **패키지 매니저**: pnpm
- **린트**: ESLint

## 주요 기능

- 캘린더에서 날짜별로 기록한 리뷰 확인 (월 이동 가능)
- OMDb 검색으로 영화를 찾아 리뷰 등록 (날짜, 별점, 리뷰 텍스트)
- 리뷰 상세 조회, 수정, 삭제
- 전체 리뷰 통계(총 개수, 평균 평점, 최근 본 영화) 확인

## 라우트

| 경로                | 설명                    |
| ------------------- | ----------------------- |
| `/`                 | 캘린더 (월별 리뷰 목록) |
| `/reviews/new`      | 영화 검색 + 리뷰 등록   |
| `/reviews/:id`      | 리뷰 상세 조회          |
| `/reviews/:id/edit` | 리뷰 수정               |
| `/stats`            | 리뷰 통계               |
| `*`                 | Not Found               |

## 로컬 실행 방법

### 1. 저장소 클론 및 패키지 설치

```bash
git clone <저장소 URL>
cd <프로젝트 폴더>
pnpm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 채웁니다.

```
VITE_SUPABASE_URL=(your_supabase_project_url)
VITE_SUPABASE_PUBLISHABLE_KEY=(your_supabase_publishable_key)
VITE_OMDB_API_KEY=(your_omdb_api_key)
```

- Supabase URL/키는 [Supabase 대시보드](https://supabase.com) → Settings → API Keys에서 확인할 수 있습니다.
- OMDb API 키는 [omdbapi.com](https://www.omdbapi.com/apikey.aspx)에서 무료로 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:5173` 접속.

### 4. 프로덕션 빌드

```bash
pnpm build
```

프로덕션 배포를 하려면 `dist/` 폴더를 웹 서버로 정적 배포하면 된다.

## 데이터베이스 스키마 (Supabase)

`movie_reviews` 테이블:

| 컬럼           | 타입            | 설명                        |
| -------------- | --------------- | --------------------------- |
| `id`           | uuid (PK)       | 기본키, `gen_random_uuid()` |
| `watched_date` | date            | 영화를 본 날짜              |
| `imdb_id`      | text            | OMDb의 imdbID               |
| `title`        | text            | 영화 제목                   |
| `year`         | text            | 개봉 연도                   |
| `poster_url`   | text (nullable) | 포스터 이미지 URL           |
| `rating`       | int2 (nullable) | 평점 (1~5)                  |
| `review_text`  | text (nullable) | 리뷰 본문                   |
| `created_at`   | timestamptz     | 생성 시각                   |

## 배포 참고사항

Vite 기반 SPA를 Vercel에 배포할 경우, 클라이언트 사이드 라우팅이 새로고침/직접 URL 접근 시에도 정상 동작하도록 프로젝트 루트에 `vercel.json`이 필요합니다.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

배포 환경에서도 위 환경변수 3개를 플랫폼(Vercel/Netlify 등)의 Environment Variables 설정에 동일하게 등록해야 합니다.
