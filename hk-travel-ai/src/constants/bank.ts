export interface BankProps {
  bankType: "BOC" | "SHACOM";
}

export const BANKS = (selectedBank: BankProps) => {
  switch (selectedBank.bankType) {
    case "BOC":
      return {
        bank: {
          initial: "BOC",
          english: "Bank of China",
          traditionalChinese: "中國銀行",
          simplifiedChinese: "中国银行",
        }
      };
    case "SHACOM":
      return {
        bank: {
          initial: "Shacom",
          english: "Shacom Bank",
          traditionalChinese: "上海商業銀行",
          simplifiedChinese: "上海商业银行",
        }
      };
  }
}