# 樂衍 GitHub Pages + Supabase

## 已準備
- config.json 含專案URL與publishable key（前端公開用途，非service_role）及登入Email；實際帳號顯示daniel。
- schema.sql 建立每個使用者各自的 cases／dispatch documents。RLS 同時檢查 auth.uid() 與 JWT aal2；匿名、只通過密碼(aal1)、其他owner均不能讀寫。
- 後端RPC以revision檢查多裝置同時修改，衝突顯示需重載，不自動覆蓋。
- 帳號密碼→TOTP MFA；初次登入可綁定QR。邀請／復原連結可設定固定密碼。沒有公開註冊UI。
- 未驗證前不請求案件資料；資料載入後再掛載管理頁。空帳號是空案件與空月曆，不包含舊示範紀錄。
- 右下同步狀態如實顯示已儲存／儲存中／失敗；失敗可重試，衝突須保留內容再重載，未儲存時阻擋直接登出並提示離頁。
- 案件與派工僅以記憶體作暫存，寫入Supabase，不再寫localStorage。Supabase SDK仍會使用其自己的瀏覽器auth session儲存；原原型資料鍵不刪除、不自動匯入。

## Supabase控制台設定
1. 執行 schema.sql（目前使用者已執行，匿名select實測拒絕）。
2. 關閉公開註冊（已由 /auth/v1/settings 確認disable_signup=true）。
3. Site URL與Redirect URLs設定 `https://daniel60605.github.io/leyan-north-preview/`。
4. Authentication → Users → Add user → Send invitation，寄至本人確認的Email。請在登入頁部署完成後寄。對方自行設定密碼，再綁定驗證器，不在聊天交付固定密碼或OTP金鑰。
5. 若控制台未提供邀請入口，使用Add user建立帳號後由控制台寄reset password信；不要給前端service_role key。
6. 驗證器無法使用時需管理員確認身分後在控制台重設MFA。此方案沒有自行宣稱Supabase具備一次性備援碼；使用者可保留驗證器備份。

## 建置
npm ci
npm run build
發佈 dist/ 到現有GitHub Pages repository根目錄。不要發佈node_modules、測試與管理用secret。此專案沒有service_role key。

## 驗證界線
mock-check.mjs 使用真實Supabase JS SDK與模擬API驗證登入、密碼與OTP分階段、錯誤OTP阻擋、雲端讀寫、重新載入、衝突及四尺寸登入頁。模擬測試不是正式專案登入／RLS端到端驗證；真實AAL2 token取得、第一次綁定與跨owner權限需待本人完成邀請登入後進行。
實際匿名API已驗證資料表返回permission denied，並確認公開註冊關閉。未獲使用者登入前，不聲稱正式MFA與RLS完整驗證通過。
