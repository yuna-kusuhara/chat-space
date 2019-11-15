# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar(255)|null: false|
|email|varchar(255)|null: false|
|pass|varchar(255)|null: false|

### Association
- has_many :groups, through: :groups_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar(255)|null: false|

### Association
- has_many :users, through: :groups_users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|text|varchar(255)|null: false|
|image|varchar(255)|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
