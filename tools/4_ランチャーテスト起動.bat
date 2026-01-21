@echo off
chcp 65001 >nul
echo ============================================================
echo   ランチャーテスト起動ツール
echo ============================================================
echo.
echo このツールはかめぱわぁ～るどランチャーを
echo ローカルHTTPサーバーに接続してテスト起動します。
echo.
echo 【重要】
echo   事前に「3_ローカルサーバー起動.bat」で
echo   HTTPサーバーを起動しておく必要があります！
echo.
echo ============================================================
echo.

set LAUNCHER_PATH=%LOCALAPPDATA%\Programs\KamePowerLauncher\KamePowerLauncher.exe
set DISTRO_URL=http://localhost:8080/distribution.json

if not exist "%LAUNCHER_PATH%" (
    echo ============================================================
    echo   エラー: ランチャーが見つかりません
    echo ============================================================
    echo.
    echo   ランチャーパス:
    echo   %LAUNCHER_PATH%
    echo.
    echo   かめぱわぁ～るどランチャーをインストールしてから
    echo   再度実行してください
    echo.
    echo ============================================================
    pause
    exit /b 1
)

echo 【確認】
echo   ランチャーパス: %LAUNCHER_PATH%
echo   Distro URL: %DISTRO_URL%
echo.
echo   「3_ローカルサーバー起動.bat」が起動していることを確認してください
echo.

pause

echo.
echo ============================================================
echo   ランチャー起動中...
echo ============================================================
echo.

"%LAUNCHER_PATH%" --distro=%DISTRO_URL%

echo.
echo ランチャーが起動しました。
echo ランチャーで追加したModパックが表示されることを確認してください。
echo.

pause
