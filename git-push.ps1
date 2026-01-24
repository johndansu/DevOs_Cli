# Safe git push function that pulls before pushing
function Safe-GitPush {
    param(
        [string]$Remote = "origin",
        [string]$Branch = "master"
    )
    
    Write-Host "🔄 Pulling latest changes from $Remote/$Branch..." -ForegroundColor Yellow
    $pullResult = git pull $Remote $Branch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Pull successful. Proceeding with push..." -ForegroundColor Green
        git push $Remote $Branch
    } else {
        Write-Host "❌ Pull failed. Please resolve conflicts manually." -ForegroundColor Red
        Write-Host "Run 'git status' to see conflicts and resolve them before pushing." -ForegroundColor Yellow
    }
}

# Run the function
Safe-GitPush
