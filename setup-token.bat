@echo off
echo 🔐 PyPI Token Setup
echo ==================
echo.
echo Please copy your COMPLETE PyPI token here.
echo The token should start with "pypi-" and be very long.
echo.
set /p token="Enter your PyPI token: "

echo.
echo Creating .pypirc file...

REM Create .pypirc file with the token
(
echo [distutils]
echo index-servers = pypi testpypi
echo.
echo [pypi]
echo username = __token__
echo password = %token%
echo.
echo [testpypi]
echo repository = https://test.pypi.org/legacy/
echo username = __token__
echo password = your-testpypi-token-here
) > "%USERPROFILE%\.pypirc"

echo.
echo ✅ Configuration saved to: %USERPROFILE%\.pypirc
echo.
echo 🧪 Verifying configuration...
python verify-pypi.py
echo.
echo 🚀 Ready to publish! Run: python publish.py
pause
