FROM chainguard/jdk:latest
COPY /server/target/server-0.0.1-SNAPSHOT.jar server-app.jar
ENTRYPOINT ["java", "-jar", "server-app.jar"]