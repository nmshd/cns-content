set -e
set -x

if [ -z "$(which jq)" ]; then
    echo "jq could not be found"
    exit 1
fi

VERSION=$(jq .version package.json -cr)

npm set //registry.npmjs.org/:_authToken=${NPM_TOKEN}

case "$VERSION" in
  *-alpha*) npm publish --tag alpha ;;
  *-beta*)  npm publish --tag beta ;;
  *-rc*)    npm publish --tag next ;;
  *)        npm publish ;;
esac
