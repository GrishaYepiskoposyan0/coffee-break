-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "locationLat" TEXT NOT NULL,
    "locationLng" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchContactInformation" (
    "id" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "contactType" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "BranchContactInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchContactInformation" ADD CONSTRAINT "BranchContactInformation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
