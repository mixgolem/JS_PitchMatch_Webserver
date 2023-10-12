/*서버 시작 방법*/
config.json 파일 참고하여 sequelize db:create로 mySQL과 시퀼라이즈 연결
그 후 nodemon app.js로 서버 실행 

/*실행이 안될 경우*/
1.MYSQL 데이터베이스 커넥션 생성 확인 (이름 localhost, 비밀번호1234로 설정)
2.콘솔창에 npm uninstall bcrypt sequelize sequelize-cli mysql2 nodemon
3.다시 재설치 npm install bcrypt sequelize sequelize-cli mysql2 , npm install --save-dev nodemon
4. nodemon app.js
