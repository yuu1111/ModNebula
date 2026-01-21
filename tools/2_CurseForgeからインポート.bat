@echo off
chcp 65001 >nul
echo ============================================================
echo   CurseForge Modパックインポートツール
echo ============================================================
echo.
echo このツールはCurseForge形式のModパックをインポートします。
echo.
echo 【事前準備】
echo   C:\git\ModPacks\modpacks\curseforge に
echo   CurseForge形式のModパックのzipファイルを配置してください
echo.
echo ============================================================
echo.

set /p PACK_NAME="Modパック名を入力してください (例: LegacyCraft): "
if "%PACK_NAME%"=="" (
    echo.
    echo エラー: Modパック名が入力されていません
    pause
    exit /b 1
)

set /p ZIP_NAME="zipファイル名を入力してください (例: LegacyCraft-v2.2.1-release-cf.zip): "
if "%ZIP_NAME%"=="" (
    echo.
    echo エラー: zipファイル名が入力されていません
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   インポート実行中...
echo ============================================================
echo   Modパック名: %PACK_NAME%
echo   zipファイル: %ZIP_NAME%
echo ============================================================
echo.

..\modnebula.exe generate server-curseforge %PACK_NAME% %ZIP_NAME%

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo   インポート完了しました！
    echo ============================================================
    echo.
    echo 【次のステップ】
    echo   1. 以下のファイルを開いて編集してください:
    echo      servers\%PACK_NAME%\servermeta.json
    echo.
    echo      以下の項目を空文字列("")にしてください:
    echo      - icon
    echo      - address
    echo      - discord の各項目
    echo.
    echo   2. 「1_Modパックをビルド.bat」を実行してください
    echo.
    echo ============================================================
) else (
    echo.
    echo ============================================================
    echo   エラー: インポートに失敗しました
    echo ============================================================
    echo.
    echo   以下を確認してください:
    echo   - zipファイルが正しい場所にあるか
    echo   - zipファイル名が正しいか
    echo   - .envファイルが正しく設定されているか
    echo.
    echo ============================================================
)

pause
