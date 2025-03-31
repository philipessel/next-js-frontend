import subprocess
import time

# Define image details
docker_hub_image = "philipessel2006/my-next-js-frontend:latest"
local_registry = "localhost:5000"
local_image = f"{local_registry}/my-next-js-frontend:latest"
container_name = "my-next-js-container"

def run_command(command):
    """Run a shell command and return output."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        print(f"✅ Success: {command}")
        print(result.stdout)
    else:
        print(f"❌ Error: {command}")
        print(result.stderr)
    return result.returncode, result.stdout

# 1. Pull image from Docker Hub
print("\n🔄 Pulling image from Docker Hub...")
run_command(f"docker pull {docker_hub_image}")

# 2. Tag the image for the local registry
print("\n🔄 Tagging image for local registry...")
run_command(f"docker tag {docker_hub_image} {local_image}")

# 3. Push the image to the local registry
print("\n🚀 Pushing image to local registry...")
run_command(f"docker push {local_image}")

# 4. Run the container locally
print("\n🏃 Running the container locally...")
run_command(f"docker run -d -p 3000:3000 --name {container_name} {local_image}")

# 5. Wait a few seconds to ensure the container starts
time.sleep(5)

# 6. Check if the container is running
print("\n🔍 Checking if the container is running...")
exit_code, output = run_command(f"docker ps --filter 'name={container_name}' --format '{{{{.Names}}}}'")

if container_name in output:
    print(f"\n✅ The container '{container_name}' is running successfully!")
else:
    print(f"\n❌ The container '{container_name}' is NOT running. Check logs with:")
    print(f"   docker logs {container_name}")
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    