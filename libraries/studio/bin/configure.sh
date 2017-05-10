#!/bin/bash

LYCHEEJS_ROOT=$(cd "$(dirname "$(readlink -f "$0")")/../../../"; pwd);
LYCHEEJS_HELPER="$LYCHEEJS_ROOT/bin/helper.sh";
PROJECT_ROOT=$(cd "$(dirname "$(readlink -f "$0")")/../"; pwd);
PROJECT_BUILD="$1";


FC_LIST=`which fc-list`;


if [ "$FC_LIST" != "" ]; then

	cd $PROJECT_ROOT;

	$FC_LIST :lang=en family style > .fc-cache;

	"$LYCHEEJS_HELPER" env:node ./bin/configure-font-cache.js;


	echo "SUCCESS";
	exit 0;

else

	echo "FAILURE";
	exit 1;

fi;

