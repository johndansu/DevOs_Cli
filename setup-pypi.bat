@echo off
echo Setting up PyPI configuration...
echo.

REM Create .pypirc file
echo [distutils] > %USERPROFILE%\.pypirc
echo index-servers = pypi testpypi >> %USERPROFILE%\.pypirc
echo. >> %USERPROFILE%\.pypirc
echo [pypi] >> %USERPROFILE%\.pypirc
echo username = __token__ >> %USERPROFILE%\.pypirc
echo password = YOUR_PYPI_TOKEN_HERE >> %USERPROFILE%\.pypirc
echo. >> %USERPROFILE%\.pypirc
echo [testpypi] >> %USERPROFILE%\.pypirc
echo repository = https://test.pypi.org/legacy/ >> %USERPROFILE%\.pypirc
echo username = __token__ >> %USERPROFILE%\.pypirc
echo password = YOUR_TESTPYPI_TOKEN_HERE >> %USERPROFILE%\.pypirc

echo.
echo ✅ .pypirc file created at: %USERPROFILE%\.pypirc
echo.
echo ⚠️  IMPORTANT: Edit the file and replace:
echo    - YOUR_PYPI_TOKEN_HERE with your actual PyPI token
echo    - YOUR_TESTPYPI_TOKEN_HERE with your TestPyPI token
echo.
echo You can edit with: notepad %USERPROFILE%\.pypirc
pause
