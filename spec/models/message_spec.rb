require 'rails_helper'
describe Message do
  describe '#create' do
    it "message true" do
      message = build(:message)
      expect(message).to be_valid
    end
  end
end