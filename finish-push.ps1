# Reset to clean state
cd C:\Users\HP\Desktop\ridewise

# Abort any ongoing rebase
git rebase --abort -q 2>$null

# Check current status
Write-Host "Current branch: $(git branch --show-current)"
Write-Host "Latest commit: $(git log --oneline -1)"

# Push to GitHub
Write-Host "`nPushing to GitHub..."
git push origin Rishethavalli-kondi --force-with-lease

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Push successful!"
    Write-Host "GitHub Branch URL: https://github.com/springboardmentor1000-del/RideWise-BikeDemandPrediction2/tree/Rishethavalli-kondi"
} else {
    Write-Host "`n❌ Push failed with exit code: $LASTEXITCODE"
}
