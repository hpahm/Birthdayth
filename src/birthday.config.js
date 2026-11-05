export const birthdayConfig = {
  // Thông tin người nhận
  recipient: {
    name: "",
    nickname: "",
    birthDate: "2011-11-11T00:00:00", // Định dạng YYYY-MM-DDTHH:mm:ss
    displayDate: "11 . 11",
  },

  // Đặt file mp3 vào thư mục public/music/ (vd: public/music/bg.mp3 và public/music/letter.mp3)
  music: {
    bgMusic: {
      title: "De danh cho em",
      src: "/music/bg.mp3", // File nhạc nền ngoài trang chính
    },
    letterMusic: {
      title: "Cho chut",
      src: "/music/letter.mp3", // File nhạc khi mở bức thư
    },
  },

  wishReceiver: {
    telegram: {
      enabled: true,
      botToken: "",
      chatId: "",
    }
  },
  // Lời chúc chính trong thư
  wish: {
    paragraphs: [
      "Thêm một tuổi mới, mong Fr sẽ ngày càng xinh đẹp hơn, học tập tốt hơn và luôn giữ được nụ cười trên môi.",
      "Mong mọi ước mơ của Fr đều sớm trở thành hiện thực, trên con đường phía trước luôn có bình yên, tình yêu thương và sự dịu dàng.",
      "Cảm ơn Fr vì đã luôn là một món quà đặc biệt và ấm áp của tui. 🌸",
    ],
    signature: "Hpahm❤️",
  },
};
