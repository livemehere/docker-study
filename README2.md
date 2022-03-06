# docker-compose

## docker-compose 란?

앞서 우리는 이미지를 통해서 컨테이너를 만들어 각각의 독립적인 프로세스를 띄웠습니다.
그런데 온전한 하나의 서비스를 위해서 서버와 db가 돌아가는 상황이라고 생각한다면
컨테이너를 두개만들어야 겠죠?

그렇다면 우리는 매번 docker run 명령어와 그에 맞는 옵션들을 기억하고있어야 할겁니다.
또 컨테이너도 개별적으로 만들어주어야하구요. 2개가 아니라 3~4개면 한번의 명령어로 배포하기는 쉽지 않을겁니다.

이것을 도와주는 친구가 바로 docker-compose입니다.

- Docker compose란, 여러 개의 컨테이너로부터 이루어진 서비스를 구축, 실행하는 순서를 자동으로 하여, 관리를 간단히하는 기능을 합니다.

- docker-compose는 1회의 커맨드 실행으로, 설정파일을 읽어들여 필요한 모든 서비스를 생성&실행시킵니다.

## 전체 flow

1. 각 컨테이너의 Dockerfile을 작성한다.(기존의 Image를 사용하는 경우라면 불필요)
2. docker-compose.yaml을 작성한다.(각 컨테이너의 run 옵션 정의)
3. docker-compose up -d 커맨드를 이용하여 정의한 모든 컨테이너를 생성 & 실행한다.

> docker-compose start, stop, status 명령어를 지원한다.(묶어서 생성한 컨테이너 일괄 관리)

## docker-compose 설치하기

- 순서대로 따라하자!
- 기존에 설치된 docker-compose를 제거하고 새로 설치하고 명령권한을 주는 거까지 포함되어있다.

```bash
rm /usr/local/bin/docker-compose

curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

docker-compose version
```

## CLI

```js
docker-compose up -d// 실행
docker-compose stop //중지
docker-compose up -d --build //실행하면서 빌드하려면
```

## docker-compose.yaml 파일

```yaml
version: "3" # 버전 명시

# 컨테이너들 정의
services:
  app: # app 컨테이너
    build:
      context: . # 자체적 이미지를 이용한다면 Dockerfile의 경로를 지정 .는 현재
    ports: # host포트:컨테이너 내부포트 포워딩
      - 3000:3000
    depends_on: # 의존성 주입(network 연결효과도있음)
      - db

    db: # mariadb 컨테이너
      image: mariadb # 기존의 이미지를 사용할경우 (dockerhub) image로 지정
      ports: # 외부 포트 연결
        - 3306:3306
      expose: # 컨테이너들 간에 공유할 포트 지정
        - 3306
      environment: # mariadb에서 요구하는 환경변수 설정
        MYSQL_ROOT_PASSWARD: 1234
      volumes: # db데이터를 호스트 환경과 연결(영구저장)
        - test_volume:/var/lib/mysql # 볼륨으로 안하고 절대경로로 지정해도됨

volumes: # 볼륨을 사용하려면 정의해야함
  test_volume:
```

# .dockerignore

COPY 시에 카피하고싶지 않은 항목도 있을것인데, 예를 들면 node_modules 같은 것들이다.

#### .dockerignore

- gitignore 과 같이 제외하고싶은 항목을 추가해주면된다.

```
node_modules
```
