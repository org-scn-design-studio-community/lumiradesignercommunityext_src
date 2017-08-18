set current=%cd%

set module=org.scn.community.shared
cd ..\legacy_src\%module%\script\
call build.cmd
cd %current%

set module=org.scn.community.utils
cd ..\legacy_src\%module%\script\
call build.cmd
cd %current%

set module=org.scn.community.basics
cd ..\legacy_src\%module%\script\
call build.cmd
cd %current%

set module=org.scn.community.databound
cd ..\legacy_src\%module%\script\
call build.cmd
cd %current%

set module=org.scn.community.datasource
cd ..\legacy_src\%module%\script\
call build.cmd
cd %current%

set module=org.scn.community.prototypes
cd ..\legacy_src\%module%\script\
call build.cmd
cd %current%

set module=org.scn.community.geovis
cd ..\legacy_src\%module%\script\
call build.cmd
cd %current%

copy ..\legacy_src\org.scn.community.basics\res\require_loader.js ..\legacy_src\org.scn.community.databound\res\require_loader.js /Y
copy ..\legacy_src\org.scn.community.basics\res\require_loader.js ..\legacy_src\org.scn.community.utils\res\require_loader.js /Y
copy ..\legacy_src\org.scn.community.basics\res\require_loader.js ..\legacy_src\org.scn.community.datasource\res\require_loader.js /Y
copy ..\legacy_src\org.scn.community.basics\res\require_loader.js ..\legacy_src\org.scn.community.prototypes\res\require_loader.js /Y
copy ..\legacy_src\org.scn.community.basics\res\require_loader.js ..\legacy_src\org.scn.community.shared\res\require_loader.js /Y

copy ..\legacy_src\org.scn.community.basics\aps\*.* ..\legacy_src\org.scn.community.databound\aps\ /Y
copy ..\legacy_src\org.scn.community.basics\aps\*.* ..\legacy_src\org.scn.community.utils\aps\ /Y
copy ..\legacy_src\org.scn.community.basics\aps\*.* ..\legacy_src\org.scn.community.datasource\aps\ /Y
copy ..\legacy_src\org.scn.community.basics\aps\*.* ..\legacy_src\org.scn.community.prototypes\aps\ /Y