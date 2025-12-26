$targetDir = "c:\Users\mrsba\OneDrive\Documents\rebuild-20251221T174235Z-1-001\rebuild\delta-iota-static\assets\site-files"
Get-ChildItem -Path $targetDir -File | ForEach-Object {
    $oldName = $_.Name
    $extension = [System.IO.Path]::GetExtension($oldName).ToLower()
    $nameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($oldName).ToLower()
    
    # Normalize extension
    if ($extension -eq ".jpeg" -or $extension -eq ".jpg") { $extension = ".jpg" }
    elseif ($extension -eq ".png") { $extension = ".png" }
    
    # Clean up name: Replace any non-alphanumeric with hyphen
    $cleanName = $nameWithoutExtension -replace '[^a-z0-9]', '-'
    $cleanName = $cleanName -replace '-+', '-' # collapse hyphens
    $cleanName = $cleanName.Trim('-')
    
    $finalName = "$cleanName$extension"
    
    if ($oldName -ne $finalName) {
        Write-Host "Renaming '$oldName' to '$finalName'"
        try {
            Rename-Item $_.FullName -NewName $finalName -Force
        } catch {
            Write-Warning "Failed to rename '$oldName': $_"
        }
    }
}
