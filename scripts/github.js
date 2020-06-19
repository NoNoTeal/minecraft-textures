var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       var releases = JSON.parse(xhttp.responseText);

       if(!releases.length) { 
        document.getElementById("random").innerText(`No releases`)
        document.getElementById("off").innerText(`No releases`)
    }
    document.getElementById("random").innerText = `Click for random version`
    document.getElementById("random").className = "otherReleases"
    document.getElementById("random").addEventListener("click", randomizer);
    function randomizer() {
    var randomrelease = releases[Math.floor(Math.random() * releases.length)]

    document.getElementById("random").href = `#${randomrelease.name}`
    }
       
       document.getElementById('off').remove()

       releases = releases.sort((a, b) => {
        b = b.tag_name.toString().match(/\d+/g)
        a = a.tag_name.toString().match(/\d+/g)
        if(a.length > 2) {
            a.pop()
        }
        if(b.length > 2) {
            b.pop()
        }
        return b.join('') - a.join('');
        });
       
        for(var release in releases) {

            var h4 = document.createElement('h4')
            h4.innerText = releases[release].name
            document.getElementById("releases").appendChild(h4)

            var rls = document.createElement('a')
            rls.innerText = `Release\n${releases[release].name}`
            rls.id = releases[release].name
            rls.className = 'otherReleases'
            rls.href = releases[release].html_url
            document.getElementById("releases").appendChild(rls)

            var tag = document.createElement('a')
            tag.innerText = `Branch\n${releases[release].tag_name}`
            tag.id = releases[release].name
            tag.className = 'otherReleases'
            tag.href = 'https://github.com/nonoteal/minecraft-textures/tree/' + releases[release].tag_name
            document.getElementById("releases").appendChild(tag)

            var zip = document.createElement('a')
            zip.innerText = `Zipball Download\n${releases[release].name}`
            zip.id = releases[release].name
            zip.className = 'otherReleases'
            zip.href = releases[release].zipball_url
            document.getElementById("releases").appendChild(zip)

            var tar = document.createElement('a')
            tar.innerText = `Tarball Download\n${releases[release].name}`
            tar.id = releases[release].name
            tar.className = 'otherReleases'
            tar.href = releases[release].tarball_url
            document.getElementById("releases").appendChild(tar)
            if(releases[release].assets.length) {
            var br0 = document.createElement("a")
            br0.innerText= `\n`
            document.getElementById("releases").appendChild(br0)
            var br = document.createElement("body")
            document.getElementById("releases").appendChild(br)
            }
        }
    }
};
xhttp.open("GET", "https://api.github.com/repos/nonoteal/minecraft-textures/releases", true);
xhttp.send();

var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var repoinfo = JSON.parse(xhttp2.responseText)
        document.getElementById('starus').innerText= `${repoinfo.stargazers_count} stargazers`
        document.getElementById('issues').innerText= `${repoinfo.open_issues_count} issues open`
        document.getElementById('watchers').innerText= `${repoinfo.subscribers_count} watchers`
        document.getElementById('forkers').innerText= `${repoinfo.forks} forkers`
    }
}
xhttp2.open("GET", "https://api.github.com/repos/nonoteal/minecraft-textures", true);
xhttp2.send();