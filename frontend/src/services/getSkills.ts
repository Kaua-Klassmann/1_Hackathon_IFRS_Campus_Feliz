export default async function getSkills() {
    const response = await fetch("http://192.168.1.107:3000/skills", {
        method: "GET"
    })
    const skills = response.json()
    return skills
}