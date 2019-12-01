class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  valodates :content, presence: true, unless: :imege?
  mount_uploader :image, ImageUploader
end
