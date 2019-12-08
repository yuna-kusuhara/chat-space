require 'rails_helper'
describe Message do
  describe '#create' do
    
    context "can save" do
      it "message true" do
        message = build(:message)
        expect(message).to be_valid
      end

      it "message only content" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "message only image" do
        message = build(:message, content: nil)
        expect(message).to be_valid
      end
    end

    context "can not save" do
      it "message content and image nil" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        # binding.pry
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "message group_id nil" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "message user_id nil" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end
end