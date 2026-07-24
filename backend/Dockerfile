FROM ruby:4.0.6

RUN apt-get update && apt-get install -y nodejs postgresql-client

WORKDIR /backend

COPY . .
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend.Gemfile.lock

RUN bundle install

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]